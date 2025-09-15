// auth.js
const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");

module.exports = async function auth(msg) {
  const chatId = msg.chat.id.toString();

  const phone = await redisClient.get(chatId);
  if (phone) {
    bot.sendMessage(chatId, "Ви вже авторизовані.");
    return;
  }

  const keyboard = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📱 Надати номер телефону",
            request_contact: true,
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  };

  bot.sendMessage(
    chatId,
    "Будь ласка, надайте свій номер телефону для входу:",
    keyboard
  );
};

// Обробка контакту користувача
bot.on("contact", async (msg) => {
  const chatId = msg.chat.id.toString();
  const phone = msg.contact.phone_number.startsWith("+")
    ? msg.contact.phone_number
    : "+" + msg.contact.phone_number;

  try {
    const response = await axios.post(
      "https://prano.group/api/telegram/login",
      {
        phone,
        chatId,
      }
    );

    console.log("API response:", response.data);

    if (response.status === 200) {
      await redisClient.set(chatId, phone);

      const keyboard = {
        reply_markup: {
          keyboard: [
            ["💰 Послуги", "👤 Профіль"],
            ["✍️ Створити нове замовлення", "🧾 Історія замовлень"],
            ["📍 Адреси пунктів прийому"],
            ["🚪 Вийти"],
          ],
          resize_keyboard: true,
          one_time_keyboard: false,
        },
      };

      bot.sendMessage(chatId, "✅ Авторизація успішна!", keyboard);
    } else {
      bot.sendMessage(
        chatId,
        "❌ Не вдалося увійти. Спробуйте ще раз пізніше."
      );
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      bot.sendMessage(
        chatId,
        "⚠️ Вас не знайдено в системі.\n\nБудь ласка, спершу зареєструйтесь на сайті: [https://prano.group](https://prano.group)",
        {
          parse_mode: "Markdown",
          disable_web_page_preview: true,
        }
      );
    } else {
      console.error("❌ Помилка авторизації:", error.message);
      bot.sendMessage(chatId, "⚠️ Помилка авторизації. Спробуйте пізніше.");
    }
  }
});
