const { isReportViewer } = require("../admin");
const { sendLatestReport, sendWeekSummary, sendTrends } = require("../reports");

// Без доступу до звітів нічого не відповідаємо — так само, як на будь-який невідомий текст
const forReportViewers = (action) => async (msg) => {
  if (!(await isReportViewer(msg))) return;

  await action(msg.chat.id.toString());
};

module.exports = {
  report: forReportViewers(sendLatestReport),
  week: forReportViewers(sendWeekSummary),
  trends: forReportViewers(sendTrends),
};
