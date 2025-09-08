// orders.js
const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");

// Форматування одного замовлення
const formatOrder = (order) => {
  const createdAt = new Date(order.createdAt).toLocaleDateString("uk-UA");

  return (
    `🧾 *Попереднє замовлення*\n` +
    `👤 Клієнт: ${order.name}\n` +
    `📞 Телефон: ${order.phone}\n` +
    `✉️ Email: ${order.email}\n` +
    `👕 Тип одягу: ${order.clothType}\n` +
    `🧴 Послуга: ${order.productType}\n` +
    `📝 Примітка:\n${order.note}\n` +
    `📅 Дата створення: ${createdAt}`
  );
};

const mapStatus = (status) => {
  switch (status) {
    case "0":
      return "Очікується";
    case "1":
      return "У процесі";
    case "2":
      return "Завершено";
    default:
      return "Невідомий";
  }
};

module.exports = async function orders(msg) {
  const chatId = msg.chat.id.toString();

  try {
    // Перевіряємо авторизацію користувача
    const phone = await redisClient.get(chatId);
    if (!phone) {
      bot.sendMessage(
        chatId,
        "❌ Ви не авторизовані. Будь ласка, надайте номер телефону."
      );
      return;
    }

    // Отримуємо замовлення з API
    const response = await axios.get(
      "https://prano.group/api/telegram/orders",
      {
        headers: { Authorization: chatId },
      }
    );
    console.log("Замовлення з API:", response.data);
    let orders = response.data;

    if (!orders.length) {
      bot.sendMessage(chatId, "📭 У Вас поки немає замовлень.");
      return;
    }

    // Відбираємо 4 останні замовлення
    orders = orders.slice(-4).reverse(); // останні 4 замовлення в правильному порядку

    // Форматування повідомлення
    let message = "🧾 4 останні замовлення:\n\n";
    orders.forEach((order, index) => {
      message += `#${index + 1}\n`;
      message += formatOrder(order);
      message += "\n\n";
    });

    bot.sendMessage(chatId, message, {
      parse_mode: "Markdown",
      disable_web_page_preview: true,
    });
  } catch (error) {
    console.error("❌ Помилка отримання замовлень:", error.message);
    bot.sendMessage(
      chatId,
      "⚠️ Не вдалося отримати замовлення. Спробуйте пізніше."
    );
  }
};
