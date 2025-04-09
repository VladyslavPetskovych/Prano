const bot = require("../bot");

const start = require("../commands/start");
const profile = require("../commands/profile");
const prices = require("../commands/prices");
const orders = require("../commands/orders");

bot.onText(/\/start/, (msg) => {
  start(msg);
});

bot.on("message", (msg) => {
  console.log("Message received:", msg.text);

  const text = msg.text;

  if (text === "👤 Профіль") profile(msg);
  else if (text === "💰 Ціни") prices(msg);
  else if (text === "🧾 Замовлення") orders(msg);
});
