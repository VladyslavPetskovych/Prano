const redisClient = require("../redis");
const bot = require("../bot");

module.exports = async function createOrder(msg) {
    const chatId = msg.chat.id.toString();

    const phone = await redisClient.get(chatId);
    if (!phone) {
        bot.sendMessage(
            chatId,
            "❌ Ви не авторизовані. Будь ласка, надайте номер телефону."
        );
        return;
    }

    bot.sendMessage(chatId, "👕 Введіть, будь ласка, тип одягу:", {
        reply_markup: {
            keyboard: [["🚫 Скасувати"]],
            resize_keyboard: true,
        },
    });

    bot.once("message", async (response) => {
        const res = response.text.trim();

        if (res !== "🚫 Скасувати") {
            await redisClient.set(`${chatId}:cloth`, res);

            // показуємо кнопки послуг
            const servicesKeyboard = {
                reply_markup: {
                    keyboard: [["🧼 Хімчистка", "🧶 Ремонт"], ["🚫 Скасувати"]],
                    resize_keyboard: true,
                },
            };

            bot.sendMessage(chatId, "Оберіть послугу:", servicesKeyboard);
        }
    });
}