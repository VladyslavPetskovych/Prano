const bot = require("../bot");



bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Привіт, це бот для перевірки інформації про Ваші замовлення у компанії Prano" +
      " Широкий спектр послуг. Детальніше у нас на сайті https://prano.group \n\n" +
      "Ваші замовлення і послуги - /profile . \n\n" +
      "Є запитання?\n" +
      "[Чат з менеджером](https://t.me/Royalreservation) ✍️👩‍💼",
    { parse_mode: "Markdown", disable_web_page_preview: true }
  );
});
