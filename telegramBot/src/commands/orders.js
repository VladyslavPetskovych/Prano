// orders.js
const bot = require("../bot");
const redisClient = require("../redis");
const axios = require("axios");

const formatOrder = (order) => {
  const timestampToDate = (timestamp) => {
    if (!timestamp || timestamp === "0") return "—";
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleDateString("uk-UA");
  };

  return (
    `🧾 *Замовлення №${order.id}*\n` +
    `🧍‍♂️ Кількість речей: ${order.pieces}\n` +
    `📦 Підсумок: ${order.summary.replace(/<br>/g, "\n")}\n` +
    `💵 Сума: $${order.total}\n` +
    `📅 Створено: ${timestampToDate(order.createdDate)}\n` +
    `🚚 Доставка: ${timestampToDate(order.deliveryDate)} о ${
      order.deliveryTime
    }\n` +
    `🧺 Статус: ${mapStatus(order.status)}\n` +
    `[🔗 Переглянути квитанцію](https://prano.group/${order.receiptLink})`
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
    // Перевіряємо, чи авторизований користувач
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
        headers: {
          Authorization: chatId,
        },
      }
    );
    console.log("Замовлення з API:", response.data);
    const orders = response.data;

    if (!orders.length) {
      bot.sendMessage(chatId, "📭 У Вас поки немає замовлень.");
      return;
    }

    // Форматування повідомлення
    let message = "🧾 Ваші замовлення:\n\n";
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
