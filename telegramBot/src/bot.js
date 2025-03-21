const TelegramApi = require("node-telegram-bot-api");
require("dotenv").config();

const tokenT = process.env.token;
const bot = new TelegramApi(tokenT, { polling: true });

module.exports = bot;
