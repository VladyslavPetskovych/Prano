const bot = require("../bot");
const redisClient = require("../redis");
const { getAdminChat, escapeHtml } = require("../admin");
const { isConfigured, fetchLatestReport } = require("./mail");
const { JOURNAL_FILE, unzipReport, parseJournalRows, summarizeJournal } = require("./journal");

const POLL_INTERVAL_MS = 5 * 60 * 1000;
const LAST_REPORT_KEY = "reports:lastReportDate";
const TELEGRAM_FILE_LIMIT = 49 * 1024 * 1024;

const CONTENT_TYPES = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

let busy = false;

const money = (value) =>
  `${Math.round(value).toLocaleString("uk-UA").replace(/ /g, " ")} грн`;

const formatSummary = (report, summary) => {
  const period = summary.dates.length ? summary.dates.join(", ") : report.reportDate;
  const { newOrders } = summary;

  let text = `📊 <b>Звіт за ${escapeHtml(period)}</b>\n<i>${escapeHtml(report.subject)}</i>\n\n`;

  text += `🆕 <b>Нові замовлення:</b> ${newOrders.count} на ${money(newOrders.sum)}`;
  if (newOrders.count) text += ` (сер. чек ${money(newOrders.sum / newOrders.count)})`;
  text += "\n";
  Object.entries(newOrders.byBranch)
    .sort((a, b) => b[1].sum - a[1].sum)
    .forEach(([branch, stats]) => {
      text += `• ${escapeHtml(branch)} — ${stats.count} / ${money(stats.sum)}\n`;
    });

  const statuses = Object.entries(summary.statuses);
  if (statuses.length) {
    text += "\n🔄 <b>Зміни стану:</b>\n";
    statuses.forEach(([status, count]) => {
      text += `• ${escapeHtml(status)} — ${count}\n`;
    });
  }

  if (summary.cancelledOrders || summary.cancelledServices) {
    text +=
      `\n❌ <b>Скасування:</b> замовлень ${summary.cancelledOrders}, ` +
      `послуг ${summary.cancelledServices}\n`;
  }

  return text.trim();
};

const sendReportToChat = async (chatId, report) => {
  const files = unzipReport(report.zip);

  const journal = files.find((file) => JOURNAL_FILE.test(file.name));
  let summaryText;
  try {
    if (!journal) throw new Error("Journal PDF not found in archive");
    summaryText = formatSummary(report, summarizeJournal(await parseJournalRows(journal.data)));
  } catch (e) {
    console.error("❌ Не вдалося сформувати підсумок звіту:", e.message);
    summaryText =
      `📊 <b>${escapeHtml(report.subject)}</b>\n\n` +
      "⚠️ Не вдалося сформувати короткий підсумок, але файли звіту нижче.";
  }

  await bot.sendMessage(chatId, summaryText, { parse_mode: "HTML" });

  for (const file of files) {
    if (file.data.length > TELEGRAM_FILE_LIMIT) {
      await bot.sendMessage(
        chatId,
        `⚠️ Файл «${file.name}» завеликий для Telegram — перегляньте його в пошті.`
      );
      continue;
    }

    const extension = file.name.split(".").pop().toLowerCase();
    await bot.sendDocument(
      chatId,
      file.data,
      {},
      { filename: file.name, contentType: CONTENT_TYPES[extension] || "application/octet-stream" }
    );
  }
};

// Ручний запит з кнопки менеджера
const sendLatestReport = async (chatId) => {
  if (!isConfigured()) {
    return bot.sendMessage(chatId, "⚠️ Пошта для звітів не налаштована.");
  }
  if (busy) {
    return bot.sendMessage(chatId, "⏳ Звіт уже завантажується, зачекайте трохи.");
  }

  busy = true;
  try {
    await bot.sendMessage(chatId, "⏳ Завантажую останній звіт…");
    const report = await fetchLatestReport({ withZip: true, days: 30 });

    if (!report) {
      return bot.sendMessage(chatId, "📭 За останні 30 днів звітів не знайдено.");
    }

    await sendReportToChat(chatId, report);
  } catch (e) {
    console.error("❌ Помилка отримання звіту:", e.message);
    bot.sendMessage(chatId, "⚠️ Не вдалося отримати звіт. Спробуйте пізніше.");
  } finally {
    busy = false;
  }
};

// Автоматична відправка: новий звіт надсилається адміну один раз
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

    const adminChatId = await getAdminChat();
    if (!adminChatId) return;

    const report = await fetchLatestReport({ withZip: true });
    if (!report || report.reportDate !== latest.reportDate) return;

    await sendReportToChat(adminChatId, report);
    await redisClient.set(LAST_REPORT_KEY, report.reportDate);
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

module.exports = { startReportWatcher, sendLatestReport, checkForNewReport };
