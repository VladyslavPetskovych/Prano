const mongoose = require("mongoose");
const DailyStat = require("./DailyStat.model");
const { escapeHtml } = require("../admin");
const {
  WEEKDAYS_SHORT,
  MONTHS,
  money,
  moneyShort,
  parseDate,
  formatDate,
  addDays,
  change,
  bar,
  shortName,
} = require("./format");

// Відділ, де зроблено зміну, — у дужках в кінці опису: "(Леоленд)", "(2.Липинського 54)"
const branchOf = (row, branchBySuffix) => {
  const fromDesc = row.desc.match(/\(([^()]+)\)\s*$/)?.[1]?.replace(/^\d+\.\s*/, "").trim();
  return fromDesc || branchBySuffix[row.order.split("-").pop()] || "Без філії";
};

const isCreation = (row) => /створенн|создани/i.test(row.desc);

// Показники за кожен день з історії змін (лише дні до untilDate включно — пізніші ще неповні)
const buildDailyStats = (analysisRows, untilDate, branchBySuffix = {}) => {
  const until = parseDate(untilDate);
  const days = new Map();

  for (const row of analysisRows) {
    const day = parseDate(row.changeDate);
    if (Number.isNaN(day.getTime()) || day > until) continue;

    let stat = days.get(row.changeDate);
    if (!stat) {
      stat = {
        date: row.changeDate,
        day,
        received: 0,
        refunded: 0,
        newOrders: 0,
        newOrdersSum: 0,
        branches: new Map(),
        employees: new Map(),
        biggestOrder: null,
      };
      days.set(row.changeDate, stat);
    }

    const branchName = branchOf(row, branchBySuffix);
    let branch = stat.branches.get(branchName);
    if (!branch) {
      branch = { name: branchName, received: 0, refunded: 0, newOrders: 0, newOrdersSum: 0 };
      stat.branches.set(branchName, branch);
    }

    const paid = row.paidAfter - row.paidBefore;
    if (paid > 0) {
      stat.received += paid;
      branch.received += paid;
    } else if (paid < 0) {
      stat.refunded -= paid;
      branch.refunded -= paid;
    }

    if (isCreation(row)) {
      stat.newOrders++;
      stat.newOrdersSum += row.sumAfter;
      branch.newOrders++;
      branch.newOrdersSum += row.sumAfter;
      if (row.who) stat.employees.set(row.who, (stat.employees.get(row.who) || 0) + 1);
      if (!stat.biggestOrder || row.sumAfter > stat.biggestOrder.amount) {
        stat.biggestOrder = { order: row.order, amount: row.sumAfter, branch: branchName };
      }
    }
  }

  return [...days.values()].map((stat) => ({
    ...stat,
    branches: [...stat.branches.values()],
    employees: [...stat.employees].map(([name, newOrders]) => ({ name, newOrders })),
  }));
};

const operationsFromJournal = (journal) => ({
  readyForPickup: journal.statuses["Готов к выдаче"] || 0,
  issueDateChanges: journal.issueDateChanges,
  reworkReturns: journal.reworkReturns,
  cancelledOrders: journal.cancelledOrders,
  cancelledServices: journal.cancelledServices,
  priceReductions: journal.priceReductions,
});

const assertDbReady = () => {
  if (mongoose.connection.readyState !== 1) throw new Error("MongoDB is not connected");
};

// Зберігає дні в БД (оновлює наявні); операції з журналу — лише за день журналу
const saveDailyStats = async (days, journalDate = null, journal = null) => {
  assertDbReady();

  const operations = [];
  for (const { date, ...fields } of days) {
    operations.push({
      updateOne: { filter: { date }, update: { $set: { date, ...fields } }, upsert: true },
    });
  }
  if (journalDate && journal) {
    operations.push({
      updateOne: {
        filter: { date: journalDate },
        update: {
          $set: { operations: operationsFromJournal(journal) },
          $setOnInsert: { day: parseDate(journalDate) },
        },
        upsert: true,
      },
    });
  }

  if (operations.length) await DailyStat.bulkWrite(operations, { ordered: true });
};

const loadDailyStats = async () => {
  assertDbReady();
  return DailyStat.find().sort({ day: 1 }).lean();
};

// ---------- Підсумки за період ----------

const sumPeriod = (stats) => {
  const total = {
    received: 0,
    refunded: 0,
    newOrders: 0,
    newOrdersSum: 0,
    branches: {},
    employees: {},
    operations: null,
    operationDays: 0,
  };

  for (const stat of stats) {
    total.received += stat.received;
    total.refunded += stat.refunded;
    total.newOrders += stat.newOrders;
    total.newOrdersSum += stat.newOrdersSum;

    for (const branch of stat.branches || []) {
      const sum = (total.branches[branch.name] ||= { received: 0, newOrders: 0 });
      sum.received += branch.received;
      sum.newOrders += branch.newOrders;
    }
    for (const employee of stat.employees || []) {
      total.employees[employee.name] = (total.employees[employee.name] || 0) + employee.newOrders;
    }

    if (stat.operations) {
      const ops = (total.operations ||= {
        readyForPickup: 0,
        issueDateChanges: 0,
        reworkReturns: 0,
        cancelledOrders: 0,
        cancelledServices: 0,
        cancelledSum: 0,
        priceReductions: 0,
        priceReductionSum: 0,
      });
      ops.readyForPickup += stat.operations.readyForPickup || 0;
      ops.issueDateChanges += stat.operations.issueDateChanges || 0;
      ops.reworkReturns += stat.operations.reworkReturns || 0;
      ops.cancelledOrders += stat.operations.cancelledOrders || 0;
      ops.cancelledServices += stat.operations.cancelledServices?.count || 0;
      ops.cancelledSum += stat.operations.cancelledServices?.sum || 0;
      ops.priceReductions += stat.operations.priceReductions?.count || 0;
      ops.priceReductionSum += stat.operations.priceReductions?.sum || 0;
      total.operationDays++;
    }
  }

  total.averageCheck = total.newOrders ? total.newOrdersSum / total.newOrders : 0;
  return total;
};

const inRange = (stats, from, to) => stats.filter((s) => s.day >= from && s.day <= to);

const shortDate = (date) => formatDate(date).slice(0, 5);

const withChange = (current, previous) => {
  const text = change(current, previous);
  return text ? ` ${text}` : "";
};

// ---------- 📅 Тиждень ----------

const formatWeek = (stats) => {
  const end = stats[stats.length - 1].day;
  const start = addDays(end, -6);
  const current = inRange(stats, start, end);
  const previous = inRange(stats, addDays(start, -7), addDays(start, -1));
  const week = sumPeriod(current);
  const prev = previous.length ? sumPeriod(previous) : null;

  let text = `📅 <b>Тиждень ${shortDate(start)} – ${formatDate(end)}</b>\n\n`;
  text += `💰 Оплати: <b>${money(week.received)}</b>${withChange(week.received, prev?.received)}\n`;
  if (week.refunded) text += `↩️ Повернуто клієнтам: ${money(week.refunded)}\n`;
  text += `🆕 Нові замовлення: <b>${week.newOrders}</b> на ${money(week.newOrdersSum)}`;
  text += `${withChange(week.newOrders, prev?.newOrders)}\n`;
  text += `🧾 Середній чек: ${money(week.averageCheck)}${withChange(week.averageCheck, prev?.averageCheck)}\n`;
  if (prev) text += "<i>% — порівняно з попереднім тижнем</i>\n";

  // Усі 7 днів, навіть якщо за день немає даних
  const byDate = new Map(current.map((s) => [s.date, s]));
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(start, i);
    return { day, stat: byDate.get(formatDate(day)) };
  });
  const maxReceived = Math.max(...days.map((d) => d.stat?.received || 0));

  text += "\n📆 <b>По днях</b> (оплати · замовлення):\n";
  for (const { day, stat } of days) {
    const label = `${WEEKDAYS_SHORT[day.getUTCDay()]} ${shortDate(day)}`;
    text += stat
      ? `${label} ${bar(stat.received, maxReceived, 8)} ${moneyShort(stat.received)} · ${stat.newOrders}\n`
      : `${label} — немає даних\n`;
  }

  const withData = days.filter((d) => d.stat);
  if (withData.length > 1) {
    const best = withData.reduce((a, b) => (b.stat.received > a.stat.received ? b : a));
    const worst = withData.reduce((a, b) => (b.stat.received < a.stat.received ? b : a));
    text += `🏆 Найкращий день: ${WEEKDAYS_SHORT[best.day.getUTCDay()]} ${shortDate(best.day)} — ${money(best.stat.received)}\n`;
    text += `📉 Найслабший: ${WEEKDAYS_SHORT[worst.day.getUTCDay()]} ${shortDate(worst.day)} — ${money(worst.stat.received)}\n`;
  }

  const branches = Object.entries(week.branches)
    .filter(([, b]) => b.received > 0 || b.newOrders > 0)
    .sort((a, b) => b[1].received - a[1].received);
  if (branches.length) {
    text += "\n🏢 <b>Філії</b> (оплати · замовлення):\n";
    for (const [name, branch] of branches) {
      const prevBranch = prev?.branches[name];
      text += `• ${escapeHtml(name)} — ${moneyShort(branch.received)}${withChange(branch.received, prevBranch?.received)} · ${branch.newOrders}\n`;
    }
  }

  const employees = Object.entries(week.employees).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (employees.length) {
    text += "\n👥 <b>Найбільше нових замовлень:</b>\n";
    employees.forEach(([name, count], i) => {
      text += `${i + 1}. ${escapeHtml(shortName(name))} — ${count}\n`;
    });
  }

  const ops = week.operations;
  if (ops) {
    text += `\n📦 <b>Робота з замовленнями</b> (днів з журналом: ${week.operationDays} з 7):\n`;
    text += `• Готово до видачі — ${ops.readyForPickup}\n`;
    text += `• Перенесено дату видачі — ${ops.issueDateChanges}\n`;
    if (ops.reworkReturns) text += `• Повернуто на доопрацювання — ${ops.reworkReturns}\n`;
    text += `• Скасовано: замовлень ${ops.cancelledOrders}, послуг ${ops.cancelledServices}`;
    text += ops.cancelledSum ? ` (−${money(-ops.cancelledSum)})\n` : "\n";
    if (ops.priceReductions) {
      text += `• Знижено ціну: ${ops.priceReductions} посл. (−${money(-ops.priceReductionSum)})\n`;
    }
  }

  return text.trim();
};

// ---------- 📈 Тренди ----------

const WEEKS_IN_TREND = 8;
const BRANCH_PERIOD_DAYS = 28;

const formatTrends = (stats) => {
  const end = stats[stats.length - 1].day;
  let text = `📈 <b>Тренди</b> (дані по ${formatDate(end)})\n`;
  const insights = [];

  // Тижні (по 7 днів, що закінчуються останньою датою)
  const weeks = [];
  for (let i = WEEKS_IN_TREND - 1; i >= 0; i--) {
    const weekEnd = addDays(end, -7 * i);
    const weekStart = addDays(weekEnd, -6);
    const days = inRange(stats, weekStart, weekEnd);
    if (days.length) weeks.push({ start: weekStart, total: sumPeriod(days) });
  }
  const maxWeek = Math.max(...weeks.map((w) => w.total.received));

  text += "\n💰 <b>Оплати по тижнях:</b>\n";
  weeks.forEach((week, i) => {
    const prev = weeks[i - 1]?.total.received;
    text += `${shortDate(week.start)} ${bar(week.total.received, maxWeek, 8)} ${moneyShort(week.total.received)}${withChange(week.total.received, prev)}\n`;
  });

  // Кілька тижнів поспіль у один бік
  const deltas = weeks.slice(-4).map((w, i, arr) => (i ? w.total.received - arr[i - 1].total.received : 0)).slice(1);
  if (deltas.length === 3 && deltas.every((d) => d > 0)) insights.push("Оплати ростуть 3 тижні поспіль 📈");
  if (deltas.length === 3 && deltas.every((d) => d < 0)) insights.push("Оплати падають 3 тижні поспіль ⚠️");

  // Середнє по днях тижня за останні 8 тижнів
  const weekdayFrom = addDays(end, -7 * WEEKS_IN_TREND + 1);
  const weekdayStats = inRange(stats, weekdayFrom, end);
  const weekdays = Array.from({ length: 7 }, () => ({ received: 0, newOrders: 0, count: 0 }));
  for (let d = weekdayFrom; d <= end; d = addDays(d, 1)) weekdays[d.getUTCDay()].count++;
  for (const stat of weekdayStats) {
    weekdays[stat.day.getUTCDay()].received += stat.received;
    weekdays[stat.day.getUTCDay()].newOrders += stat.newOrders;
  }
  const order = [1, 2, 3, 4, 5, 6, 0];
  const averages = order.map((i) => ({
    name: WEEKDAYS_SHORT[i],
    received: weekdays[i].count ? weekdays[i].received / weekdays[i].count : 0,
    newOrders: weekdays[i].count ? weekdays[i].newOrders / weekdays[i].count : 0,
  }));
  const maxWeekday = Math.max(...averages.map((a) => a.received));

  text += `\n📊 <b>Середнє по днях тижня</b> (${WEEKS_IN_TREND} тижнів):\n`;
  for (const day of averages) {
    text += `${day.name} ${bar(day.received, maxWeekday, 8)} ${moneyShort(day.received)} · ${Math.round(day.newOrders)} зам.\n`;
  }
  const busiest = averages.reduce((a, b) => (b.received > a.received ? b : a));
  const quietest = averages.reduce((a, b) => (b.received < a.received ? b : a));
  insights.push(`Найсильніший день — ${busiest.name}, найслабший — ${quietest.name}`);

  // Філії: останні 28 днів проти попередніх 28
  const recentFrom = addDays(end, -BRANCH_PERIOD_DAYS + 1);
  const recent = sumPeriod(inRange(stats, recentFrom, end));
  const before = sumPeriod(inRange(stats, addDays(recentFrom, -BRANCH_PERIOD_DAYS), addDays(recentFrom, -1)));

  const branches = Object.entries(recent.branches)
    .filter(([, b]) => b.received > 0)
    .sort((a, b) => b[1].received - a[1].received);
  if (branches.length) {
    text += `\n🏢 <b>Філії</b> (${BRANCH_PERIOD_DAYS} днів проти попередніх ${BRANCH_PERIOD_DAYS}):\n`;
    const growth = [];
    for (const [name, branch] of branches) {
      const share = recent.received ? Math.round((branch.received / recent.received) * 100) : 0;
      const prev = before.branches[name]?.received;
      text += `• ${escapeHtml(name)} — ${moneyShort(branch.received)}${withChange(branch.received, prev)} (частка ${share}%)\n`;
      if (prev) growth.push({ name, percent: ((branch.received - prev) / prev) * 100 });
    }
    growth.sort((a, b) => b.percent - a.percent);
    if (growth.length > 1) {
      const top = growth[0];
      const bottom = growth[growth.length - 1];
      if (top.percent > 0) insights.push(`Найшвидше росте ${escapeHtml(top.name)} (+${Math.round(top.percent)}%)`);
      if (bottom.percent < 0) insights.push(`Найбільше просіла ${escapeHtml(bottom.name)} (${Math.round(bottom.percent)}%)`);
    }
  }

  if (recent.averageCheck && before.averageCheck) {
    text += `\n🧾 Середній чек: ${money(recent.averageCheck)} (було ${money(before.averageCheck)})${withChange(recent.averageCheck, before.averageCheck)}\n`;
    const diff = Math.round(((recent.averageCheck - before.averageCheck) / before.averageCheck) * 100);
    if (Math.abs(diff) >= 5) insights.push(`Середній чек ${diff > 0 ? "виріс" : "знизився"} на ${Math.abs(diff)}%`);
  }

  // Місяці: останні 6, поточний — з прогнозом за поточним темпом
  const months = new Map();
  for (const stat of stats) {
    const key = `${stat.day.getUTCFullYear()}-${String(stat.day.getUTCMonth()).padStart(2, "0")}`;
    const month = months.get(key) || { year: stat.day.getUTCFullYear(), month: stat.day.getUTCMonth(), received: 0, newOrders: 0 };
    month.received += stat.received;
    month.newOrders += stat.newOrders;
    months.set(key, month);
  }
  const lastMonths = [...months.entries()].sort(([a], [b]) => a.localeCompare(b)).slice(-6).map(([, m]) => m);
  const maxMonth = Math.max(...lastMonths.map((m) => m.received));

  text += "\n🗓 <b>По місяцях</b> (оплати · замовлення):\n";
  for (const month of lastMonths) {
    const isCurrent = month.year === end.getUTCFullYear() && month.month === end.getUTCMonth();
    text += `${MONTHS[month.month].slice(0, 3)} ${bar(month.received, maxMonth, 8)} ${moneyShort(month.received)} · ${month.newOrders}`;
    if (isCurrent) {
      const daysPassed = end.getUTCDate();
      const daysInMonth = new Date(Date.UTC(month.year, month.month + 1, 0)).getUTCDate();
      text += ` (${daysPassed} дн., прогноз ~${moneyShort((month.received / daysPassed) * daysInMonth)})`;
    }
    text += "\n";
  }

  if (insights.length) text += `\n💡 <b>Висновки:</b>\n${insights.map((i) => `• ${i}\n`).join("")}`;

  return text.trim();
};

module.exports = { buildDailyStats, saveDailyStats, loadDailyStats, formatWeek, formatTrends };
