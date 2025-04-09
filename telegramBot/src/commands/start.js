const bot = require("../bot");

module.exports = function start(msg) {

  console.log("/start command")

  const chatId = msg.chat.id;

  const message =
    "Привіт, це бот для перевірки інформації про Ваші замовлення у компанії Prano.\n" +
    "Широкий спектр послуг. Детальніше на сайті: https://prano.group\n\n" +
    "Є запитання? [Чат з менеджером](https://t.me/Royalreservation) ✍️👩‍💼";

  const keyboard = {
    reply_markup: {
      keyboard: [["👤 Профіль", "💰 Ціни", "🧾 Замовлення"]],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };

  bot.sendMessage(chatId, message, keyboard);
};
