const mongoose = require("mongoose");
const bot = require("../bot");
const { isAdmin, formatOrder } = require("../admin");

const LAST_ORDERS_LIMIT = 10;
const MAX_MESSAGE_LENGTH = 4000;

module.exports = async function manager(msg) {
  // Не адміну нічого не відповідаємо — так само, як на будь-який невідомий текст
  if (!(await isAdmin(msg))) return;

  const chatId = msg.chat.id.toString();

  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("MongoDB is not connected");
    }

    const orders = await mongoose.connection.db
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .limit(LAST_ORDERS_LIMIT)
      .toArray();

    const header =
      "👨‍💼 <b>Панель менеджера</b>\n" +
      "🔔 Нові замовлення надходять у цей чат автоматично.\n\n";

    if (!orders.length) {
      return bot.sendMessage(chatId, header + "📭 Замовлень поки немає.", {
        parse_mode: "HTML",
      });
    }

    const blocks = orders.map(
      (order, index) => `<b>#${index + 1}</b>\n${formatOrder(order)}`
    );

    // Ділимо на кілька повідомлень, щоб не перевищити ліміт Telegram
    const messages = [];
    let current = header + `🧾 <b>Останні ${orders.length} замовлень:</b>\n\n`;
    for (const block of blocks) {
      if (current.length + block.length + 2 > MAX_MESSAGE_LENGTH) {
        messages.push(current);
        current = "";
      }
      current += block + "\n\n";
    }
    messages.push(current);

    for (const text of messages) {
      await bot.sendMessage(chatId, text.trim(), {
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
    }
  } catch (error) {
    console.error("❌ Помилка панелі менеджера:", error.message);
    bot.sendMessage(chatId, "⚠️ Не вдалося отримати замовлення. Спробуйте пізніше.");
  }
};
