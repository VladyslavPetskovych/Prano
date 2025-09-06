const bot = require("./src/bot");
console.log("2 Starting bot...");

require("./src/handlers/messageHandler");
require("./src/handlers/createOrderHandler")
const client = require("./src/redis.js");
console.log("3 🤖 Telegram bot is up and running!");

const startServer = require("./src/smsServer");