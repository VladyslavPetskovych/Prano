const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");
const { addManagerButton } = require("../admin");

const createOrder = async (msg, productType) => {
  const chatId = msg.chat.id.toString();

  const clothType = await redisClient.get(`${chatId}:cloth`);
  if (!clothType) {
    return bot.sendMessage(chatId, "⚠️ Спочатку введіть тип одягу.");
  }

  try {
    const { data: user } = await axios.get(
      "https://prano.group/api/telegram/user",
      {
        headers: {
          Authorization: chatId.toString(),
        },
      }
    );

    await axios.post(
      "https://prano.group/api/telegram/order",
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        clothType,
        productType,
      },
      {
        headers: { Authorization: chatId },
      }
    );

    const keyboardButtons = [
      ["💰 Послуги", "👤 Профіль"],
      ["✍️ Створити нове замовлення"],
      ["🧾 Ваша історія замовлень", "📍 Адреси пунктів прийому"],
      ["🚪 Вийти"],
    ];
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

    bot.sendMessage(
      chatId,
      `✅ Замовлення створено: ${clothType} (${productType})`,
      keyboard
    );
  } catch (e) {
    console.error("❌ Помилка створення замовлення:", e.message);
    bot.sendMessage(
      chatId,
      "⚠️ Не вдалося створити замовлення. Спробуйте пізніше."
    );
  }
};

bot.on("message", async (msg) => {
  const text = msg.text;

  if (text === "🧼 Хімчистка") createOrder(msg, "Хімчистка");
  if (text === "Прання") createOrder(msg, "Прання");
  if (text === "Чистка взуття") createOrder(msg, "Чистка взуття");
  if (text === "Реставрація взуття") createOrder(msg, "Реставрація взуття");
  if (text === "Ремонт одягу") createOrder(msg, "Ремонт одягу");
  if (text === "Реставрація сумок") createOrder(msg, "Реставрація сумок");
  if (text === "🚫 Скасувати") {
    const message = "🚫 Ви скасували оформлення замовлення";

    const chatId = msg.chat.id.toString();
    const phone = await redisClient.get(chatId);

    const keyboardButtons = [
      ["💰 Послуги", "👤 Профіль"],
      ["✍️ Створити нове замовлення", "🧾 Історія замовлень"],
      ["📍 Адреси пунктів прийому"],
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
  }
});
