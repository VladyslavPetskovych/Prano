const bot = require("../bot");
const redisClient = require("../redis");
const { getReportChats, escapeHtml } = require("../admin");
const { isConfigured, fetchLatestReport } = require("./mail");
const { JOURNAL_FILE, unzipReport, parseJournalRows, summarizeJournal } = require("./journal");
const { ANALYSIS_FILE, parseAnalysisRows, summarizeDay } = require("./analysis");

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const LAST_REPORT_KEY = "reports:lastReportDate";
const PROGRESS_EDIT_INTERVAL_MS = 1500;

const WEEKDAYS = ["неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "субота"];
const STATUS_NAMES = { "Готов к выдаче": "Готово до видачі", "Выдан": "Видано" };

let busy = false;

const money = (value) =>
  `${Math.round(value).toLocaleString("uk-UA").replace(/ /g, " ")} грн`;

const parseDate = (date) => {
  const [day, month, year] = date.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const formatDate = (date) =>
  [date.getUTCDate(), date.getUTCMonth() + 1]
    .map((n) => String(n).padStart(2, "0"))
    .join(".") + `.${date.getUTCFullYear()}`;

const previousDay = (date) => formatDate(new Date(parseDate(date).getTime() - 24 * 60 * 60 * 1000));

const trend = (current, previous, previousDate) => {
  if (!previous) return "";
  const change = Math.round(((current - previous) / previous) * 100);
  const arrow = change > 0 ? "▲" : change < 0 ? "▼" : "•";
  return ` ${arrow} ${Math.abs(change)}% до ${previousDate.slice(0, 5)}`;
};

// "Каймакова Тетяна Вадимівна" -> "Каймакова Т."
const shortName = (fullName) => {
  const [surname, name] = fullName.split(/\s+/);
  return name ? `${surname} ${name[0]}.` : surname;
};

const bulletList = (entries, format) =>
  entries
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => `• ${escapeHtml(name)} — ${format(value)}\n`)
    .join("");

const formatReport = (date, journal, today, yesterday, yesterdayDate) => {
  const weekday = WEEKDAYS[parseDate(date).getUTCDay()];
  let text = `📊 <b>Звіт за ${escapeHtml(date)}</b> (${weekday})\n`;

  if (today) {
    text += `\n💰 <b>Оплати:</b> ${money(today.received)}`;
    text += yesterday ? trend(today.received, yesterday.received, yesterdayDate) : "";
    text += "\n" + bulletList(Object.entries(today.receivedByBranch), money);
    if (today.refunded) {
      const branches = Object.keys(today.refundedByBranch).map(escapeHtml).join(", ");
      text += `↩️ Повернуто клієнтам: ${money(today.refunded)} (${branches})\n`;
    }
  }

  const { newOrders } = journal;
  text += `\n🆕 <b>Нові замовлення:</b> ${newOrders.count} на ${money(newOrders.sum)}`;
  text += today && yesterday ? trend(today.created, yesterday.created, yesterdayDate) : "";
  text += "\n";
  if (newOrders.count) text += `Середній чек: ${money(newOrders.sum / newOrders.count)}\n`;
  for (const [branch, stats] of Object.entries(newOrders.byBranch).sort((a, b) => b[1].sum - a[1].sum)) {
    text += `• ${escapeHtml(branch)} — ${stats.count} / ${money(stats.sum)}\n`;
  }
  if (newOrders.biggest) {
    const { order, amount, branch } = newOrders.biggest;
    text += `🏆 Найбільше: №${escapeHtml(order)} — ${money(amount)} (${escapeHtml(branch)})\n`;
  }

  const work = [];
  for (const [status, count] of Object.entries(journal.statuses)) {
    work.push(`${escapeHtml(STATUS_NAMES[status] || status)} — ${count}`);
  }
  if (journal.issueDateChanges) work.push(`Перенесено дату видачі — ${journal.issueDateChanges}`);
  if (journal.reworkReturns) work.push(`Повернуто на доопрацювання — ${journal.reworkReturns}`);
  if (journal.cancelledOrders || journal.cancelledServices.count) {
    let line = `Скасовано: замовлень ${journal.cancelledOrders}, послуг ${journal.cancelledServices.count}`;
    if (journal.cancelledServices.sum) line += ` (−${money(-journal.cancelledServices.sum)})`;
    work.push(line);
  }
  if (journal.priceReductions.count) {
    work.push(
      `Знижено ціну: ${journal.priceReductions.count} посл. (−${money(-journal.priceReductions.sum)})`
    );
  }
  if (work.length) text += `\n📦 <b>Робота з замовленнями:</b>\n${work.map((w) => `• ${w}\n`).join("")}`;

  const employees = Object.entries(journal.employees).sort((a, b) => b[1] - a[1]).slice(0, 3);
  if (employees.length) {
    text += "\n👥 <b>Найбільше нових замовлень:</b>\n";
    employees.forEach(([name, count], index) => {
      text += `${index + 1}. ${escapeHtml(shortName(name))} — ${count}\n`;
    });
  }

  return text.trim();
};

// Формує текст звіту з архіву; onStage(відсоток, підпис) — для індикатора завантаження
const buildReportText = async (report, onStage = async () => {}) => {
  await onStage(76, "Розпаковую архів…");
  const files = unzipReport(report.zip, (name) => JOURNAL_FILE.test(name) || ANALYSIS_FILE.test(name));

  const journalFile = files.find((file) => JOURNAL_FILE.test(file.name));
  if (!journalFile) throw new Error("Journal PDF not found in archive");

  await onStage(80, "Аналізую журнал замовлень…");
  const journal = summarizeJournal(
    await parseJournalRows(journalFile.data, (part) => onStage(80 + part * 10, "Аналізую журнал замовлень…"))
  );

  // День, за який дані: дата з журналу (лист приходить наступного дня)
  const date = journal.dates.sort((a, b) => parseDate(b) - parseDate(a))[0] || report.reportDate;
  const yesterdayDate = previousDay(date);

  let today = null;
  let yesterday = null;
  const analysisFile = files.find((file) => ANALYSIS_FILE.test(file.name));
  if (analysisFile) {
    await onStage(92, "Рахую оплати…");
    try {
      const rows = parseAnalysisRows(analysisFile.data, [date, yesterdayDate]);
      today = summarizeDay(rows, date, journal.branchBySuffix);
      yesterday = summarizeDay(rows, yesterdayDate, journal.branchBySuffix);
      if (!yesterday.received && !yesterday.created) yesterday = null;
    } catch (e) {
      console.error("❌ Не вдалося порахувати оплати:", e.message);
    }
  }

  return formatReport(date, journal, today, yesterday, yesterdayDate);
};

const renderProgress = (percent, label) => {
  const filled = Math.round(percent / 10);
  return (
    "⏳ <b>Готую звіт…</b>\n" +
    `${"▰".repeat(filled)}${"▱".repeat(10 - filled)} ${Math.round(percent)}%\n` +
    `<i>${label}</i>`
  );
};

// Повідомлення з індикатором, яке оновлюється і в кінці замінюється на звіт
const createProgress = async (chatId) => {
  const message = await bot.sendMessage(chatId, renderProgress(0, "Підключаюся до пошти…"), {
    parse_mode: "HTML",
  });
  const target = { chat_id: chatId, message_id: message.message_id };

  let chain = Promise.resolve();
  let lastLabel = "";
  let lastText = "";
  let lastEditAt = 0;

  const edit = (text) => {
    chain = chain
      .then(() => bot.editMessageText(text, { ...target, parse_mode: "HTML" }))
      .catch((e) => {
        if (!/not modified/i.test(e.message)) console.error("❌ Помилка індикатора:", e.message);
      });
    return chain;
  };

  return {
    // Нова стадія показується одразу, відсотки в межах стадії — не частіше ніж раз на 1,5 с
    update(percent, label) {
      const text = renderProgress(percent, label);
      if (text === lastText) return chain;
      if (label === lastLabel && Date.now() - lastEditAt < PROGRESS_EDIT_INTERVAL_MS) return chain;

      lastText = text;
      lastLabel = label;
      lastEditAt = Date.now();
      return edit(text);
    },
    async finish(text) {
      await chain;
      try {
        await bot.editMessageText(text, { ...target, parse_mode: "HTML" });
      } catch (e) {
        await bot.sendMessage(chatId, text, { parse_mode: "HTML" });
      }
    },
  };
};

// Ручний запит з кнопки "📊 Звіт"
const sendLatestReport = async (chatId) => {
  if (!isConfigured()) {
    return bot.sendMessage(chatId, "⚠️ Пошта для звітів не налаштована.");
  }
  if (busy) {
    return bot.sendMessage(chatId, "⏳ Звіт уже готується, зачекайте трохи.");
  }

  busy = true;
  let progress = null;
  try {
    progress = await createProgress(chatId);
    await progress.update(3, "Шукаю останній звіт у пошті…");

    const report = await fetchLatestReport({
      withZip: true,
      days: 30,
      onProgress: (part) => progress.update(5 + part * 70, "Завантажую звіт з пошти…"),
    });

    if (!report) {
      return await progress.finish("📭 За останні 30 днів звітів не знайдено.");
    }

    const text = await buildReportText(report, (percent, label) => progress.update(percent, label));
    await progress.finish(text);
  } catch (e) {
    console.error("❌ Помилка отримання звіту:", e.message);
    const failure = "⚠️ Не вдалося отримати звіт. Спробуйте пізніше.";
    if (progress) await progress.finish(failure);
    else bot.sendMessage(chatId, failure);
  } finally {
    busy = false;
  }
};

// Надсилає текст звіту в кожен чат; повертає кількість чатів, які його отримали
const sendTextToChats = async (chatIds, text) => {
  let delivered = 0;
  for (const chatId of chatIds) {
    try {
      await bot.sendMessage(chatId, text, { parse_mode: "HTML" });
      delivered++;
    } catch (e) {
      // Один недоступний чат (напр. заблокував бота) не зупиняє відправку іншим
      console.error(`❌ Не вдалося надіслати звіт у чат ${chatId}:`, e.message);
    }
  }
  return delivered;
};

// Автоматична відправка: новий звіт надсилається всім, хто має доступ до звітів, один раз
const checkForNewReport = async () => {
  if (busy || !redisClient.isReady) return;

  busy = true;
  try {
    const latest = await fetchLatestReport();
    if (!latest) return;

    const lastReportDate = await redisClient.get(LAST_REPORT_KEY);

    // Перший запуск — не надсилаємо старий звіт, лише запам'ятовуємо
    if (!lastReportDate) {
      await redisClient.set(LAST_REPORT_KEY, latest.reportDate);
      return;
    }
    if (lastReportDate === latest.reportDate) return;

    const chatIds = await getReportChats();
    if (!chatIds.length) return;

    const report = await fetchLatestReport({ withZip: true });
    if (!report || report.reportDate !== latest.reportDate) return;

    let text;
    try {
      text = await buildReportText(report);
    } catch (e) {
      console.error("❌ Не вдалося сформувати звіт:", e.message);
      text = `📊 <b>${escapeHtml(report.subject)}</b>\n\n⚠️ Не вдалося сформувати звіт — перегляньте його в пошті.`;
    }

    const delivered = await sendTextToChats(chatIds, text);
    // Якщо не вдалося нікому (напр. мережа) — спробуємо наступного разу
    if (delivered) await redisClient.set(LAST_REPORT_KEY, report.reportDate);
  } finally {
    busy = false;
  }
};

const startReportWatcher = () => {
  if (!isConfigured()) {
    console.log("⚠️ REPORTS_EMAIL_USER / REPORTS_EMAIL_PASSWORD не задані — звіти вимкнено");
    return;
  }

  const tick = async () => {
    try {
      await checkForNewReport();
    } catch (e) {
      console.error("❌ Помилка перевірки звітів:", e.message);
    } finally {
      setTimeout(tick, POLL_INTERVAL_MS);
    }
  };

  setTimeout(tick, 30 * 1000);
  console.log("📊 Перевірка звітів з пошти увімкнена");
};

module.exports = { startReportWatcher, sendLatestReport, checkForNewReport, buildReportText };
