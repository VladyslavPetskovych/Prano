// bot.js
const bot = require("../bot");

const start = require("../commands/start");
const profile = require("../commands/profile");
const prices = require("../commands/prices");
const orders = require("../commands/orders");
const logout = require("../commands/exit");
const createOrder = require("../commands/createOrder");
const addresses = require("../commands/addresses");

bot.onText(/\/start/, (msg) => {
  start(msg);
});

bot.on("message", async (msg) => {
  console.log("Message received:", msg.text);

  const text = msg.text;

  // Виведення відповідних команд
  if (text === "👤 Профіль") profile(msg);
  else if (text === "💰 Послуги") prices(msg);
  else if (text === "✍️ Створити нове замовлення") createOrder(msg);
  else if (text === "🧾 Ваша історія замовлень") orders(msg);
  else if (text === "📍 Адреси пунктів прийому") addresses(msg);

  // Обробка кнопки "🚪 Вийти"
  if (text === "🚪 Вийти") {
    logout(msg);
  }
});
