const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");
const auth = require("../handlers/auth");

module.exports = async function profile(msg) {
  const chatId = msg.chat.id.toString();

  const phone = await redisClient.get(chatId);

  if (!phone) {
    auth(msg);
    return;
  }

  try {
    const response = await axios.get("https://prano.group/api/telegram/user", {
      headers: {
        Authorization: chatId.toString(), 
      },
    });

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
