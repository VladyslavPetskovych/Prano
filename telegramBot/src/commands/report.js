const { isReportViewer } = require("../admin");
const { sendLatestReport } = require("../reports");

module.exports = async function report(msg) {
  // Без доступу до звітів нічого не відповідаємо — так само, як на будь-який невідомий текст
  if (!(await isReportViewer(msg))) return;

  await sendLatestReport(msg.chat.id.toString());
};
