const mongoose = require("mongoose");
const bot = require("./bot");
const redisClient = require("./redis");
const { getAdminChat, formatOrder } = require("./admin");

const POLL_INTERVAL_MS = 10 * 1000;
const BATCH_LIMIT = 20;
const LAST_ORDER_KEY = "admin:lastOrderId";

// Помилки, після яких варто спробувати ще раз (мережа, 429, 5xx)
const isTransientError = (e) => {
  if (e.code === "EFATAL") return true;
  const status = e.response?.statusCode;
  return status === 429 || status >= 500;
};

const getOrdersCollection = () => mongoose.connection.db.collection("orders");

// Під час першого запуску починаємо з останнього наявного замовлення,
// щоб не надсилати адміну всю історію
const initCursor = async () => {
  const existing = await redisClient.get(LAST_ORDER_KEY);
  if (existing) return;

  const [latest] = await getOrdersCollection()
    .find({}, { projection: { _id: 1 } })
    .sort({ _id: -1 })
    .limit(1)
    .toArray();

  await redisClient.set(
    LAST_ORDER_KEY,
    latest ? latest._id.toString() : "000000000000000000000000"
  );
};

const checkNewOrders = async () => {
  if (mongoose.connection.readyState !== 1 || !redisClient.isReady) return;

  await initCursor();

  const lastOrderId = await redisClient.get(LAST_ORDER_KEY);
  const orders = await getOrdersCollection()
    .find({ _id: { $gt: new mongoose.Types.ObjectId(lastOrderId) } })
    .sort({ _id: 1 })
    .limit(BATCH_LIMIT)
    .toArray();

  if (!orders.length) return;

  const adminChatId = await getAdminChat();

  for (const order of orders) {
    if (adminChatId) {
      try {
        await bot.sendMessage(
          adminChatId,
          `🆕 <b>Нове замовлення!</b>\n\n${formatOrder(order)}`,
          { parse_mode: "HTML", disable_web_page_preview: true }
        );
      } catch (e) {
        console.error("❌ Не вдалося надіслати замовлення адміну:", e.message);
        // Тимчасова помилка — повторимо це замовлення наступного разу
        if (isTransientError(e)) return;
      }
    }

    await redisClient.set(LAST_ORDER_KEY, order._id.toString());
  }
};

const startOrderNotifier = () => {
  const tick = async () => {
    try {
      await checkNewOrders();
    } catch (e) {
      console.error("❌ Помилка перевірки нових замовлень:", e.message);
    } finally {
      setTimeout(tick, POLL_INTERVAL_MS);
    }
  };

  setTimeout(tick, POLL_INTERVAL_MS);
  console.log("🔔 Сповіщення про нові замовлення увімкнено");
};

module.exports = startOrderNotifier;
module.exports.checkNewOrders = checkNewOrders;
