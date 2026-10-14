const bot = require("../bot");
const redisClient = require("../redis");
const { addManagerButton } = require("../admin");

module.exports = async function start(msg) {
  console.log("/start command");

  const chatId = msg.chat.id.toString();

  const phone = await redisClient.get(chatId);

  const message =
    "Привіт, це бот для перевірки інформації про Ваші замовлення у компанії Prano.\n" +
    "Широкий спектр послуг. Детальніше на сайті: https://prano.group\n\n" +
    "Є запитання? [Чат з менеджером](https://t.me/pranogroup) ✍️👩‍💼\n\n +380771515111";

  const keyboardButtons = [
    ["💰 Послуги", "👤 Профіль"],
    ["✍️ Створити нове замовлення","🧾 Історія замовлень",],
    [ "📍 Адреси пунктів прийому"],
  ];
  if (phone) keyboardButtons.push(["🚪 Вийти"]);
  await addManagerButton(msg, keyboardButtons);

  const keyboard = {
    reply_markup: {
      keyboard: keyboardButtons,
      resize_keyboard: true,
      one_time_keyboard: false,
    },
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };

  bot.sendMessage(chatId, message, keyboard);
};
