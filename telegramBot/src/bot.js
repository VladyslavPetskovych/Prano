const { Telegraf } = require("telegraf");
require("dotenv").config();

const token = process.env.token;
if (!token) {
  throw new Error("Missing required env var: token");
}

const telegraf = new Telegraf(token);

const listeners = {
  message: [],
  contact: [],
};
const textListeners = [];

const normalizeMsg = (ctx) => ctx?.message ?? null;

const bot = {
  sendMessage(chatId, text, options = {}) {
    return telegraf.telegram.sendMessage(chatId, text, options);
  },
  on(event, handler) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push({ handler, once: false });
  },
  once(event, handler) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push({ handler, once: true });
  },
  onText(regex, handler) {
    textListeners.push({ regex, handler });
  },
};

const emit = (event, msg) => {
  const queue = listeners[event];
  if (!queue || queue.length === 0) return;
  for (let i = 0; i < queue.length; i += 1) {
    const item = queue[i];
    item.handler(msg);
    if (item.once) {
      queue.splice(i, 1);
      i -= 1;
    }
  }
};

telegraf.on("message", (ctx) => {
  const msg = normalizeMsg(ctx);
  if (!msg) return;

  if (typeof msg.text === "string") {
    for (const { regex, handler } of textListeners) {
      const match = msg.text.match(regex);
      if (match) handler(msg, match);
    }
  }

  emit("message", msg);
  if (msg.contact) emit("contact", msg);
});

telegraf.launch();
process.once("SIGINT", () => telegraf.stop("SIGINT"));
process.once("SIGTERM", () => telegraf.stop("SIGTERM"));

module.exports = bot;
