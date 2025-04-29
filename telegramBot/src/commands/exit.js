// logout.js
const redisClient = require("../redis");
const bot = require("../bot");

module.exports = async function logout(msg) {
  const chatId = msg.chat.id.toString();

  // Перевірка наявності номера телефону в Redis
  const phone = await redisClient.get(chatId);
  if (!phone) {
    return bot.sendMessage(chatId, "Ви ще не авторизовані.");
  }

  // Видалення даних користувача з Redis
  await redisClient.del(chatId);

  // Повідомлення користувачу про вихід
  bot.sendMessage(chatId, "Ви вийшли з облікового запису ❌", {
    reply_markup: {
      keyboard: [
        ["👤 Профіль", "💰 Ціни", "🧾 Замовлення"], // Без кнопки "🚪 Вийти"
      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    },
  });
};
