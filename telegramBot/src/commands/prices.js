const bot = require("../bot");
const axios = require("axios");

module.exports = async (msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get("https://prano.group/api/products");

    const items = response.data?.data;

    if (!items || items.length === 0) {
      return bot.sendMessage(chatId, "🚫 Наразі послуги не завантажилися");
    }

    const priceList = items
      .map(
        (item) =>
          `🛍️ *${item.title}*\n` +
          `📄 _${item.description}_\n` 
      )
      .join("\n");

    const message = `🧾 *Наші послуги:*\n\n${priceList}\n\n🔄 Якщо ви хочете дізнатися більше, напишіть нам!`;

    bot.sendMessage(chatId, message, {
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.error("Помилка отримання послуг:", error.message);
    bot.sendMessage(
      chatId,
      "⚠️ Сталася помилка при отриманні послуг. Спробуйте пізніше."
    );
  }
};
