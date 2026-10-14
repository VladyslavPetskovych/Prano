const { isAdmin } = require("../admin");
const { sendLatestReport } = require("../reports");

module.exports = async function report(msg) {
  // Не адміну нічого не відповідаємо — так само, як на будь-який невідомий текст
  if (!(await isAdmin(msg))) return;

  await sendLatestReport(msg.chat.id.toString());
};
