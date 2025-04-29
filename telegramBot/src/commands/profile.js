const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");
const auth = require("../handlers/auth");

module.exports = async function profile(msg) {
  const chatId = msg.chat.id.toString();

  const phone = await redisClient.get(chatId);

  // Якщо користувач не авторизований
  if (!phone) {
    auth(msg); // Запускаємо авторизацію
    return;
  }

  try {
    // Отримуємо дані про користувача з бекенду
    const response = await axios.post(
      "https://prano.group/api/telegram/login",
      {
        phone,
        chatId,
      }
    );

    const userData = response.data;

    const formattedMessage = `
👤 *Ваш профіль:*

📛 Ім'я: *${userData.name}*
📧 Email: ${userData.email}
📱 Телефон: ${userData.phone}


🕓 Створено: ${new Date(userData.createdAt).toLocaleString("uk-UA")}

`;

    bot.sendMessage(chatId, formattedMessage, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("❌ Помилка отримання даних користувача:", error.message);
    bot.sendMessage(
      chatId,
      "⚠️ Не вдалося отримати дані користувача. Спробуйте пізніше."
    );
  }
};
