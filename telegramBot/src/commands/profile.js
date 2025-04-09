const bot = require("../bot");

module.exports = (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Це ваш профіль 👤\nІм’я: Іван\nНомер телефону: +380...");
};
