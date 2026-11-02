const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bot = require("./bot");
const User = require("./TelegramUser.model");


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.BD_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected");
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sendAdvert = ({ title, description, image }, chatId) => {
  const text = `<b>${title}</b>\n\n${description}`;

  if (image) {
    return bot.sendPhoto(chatId, `https://prano.group/api/advertisementImages/${image}`, {
      caption: text,
      parse_mode: "HTML",
    });
  }

  return bot.sendMessage(chatId, text, { parse_mode: "HTML" });
};

app.post("/send", async (req, res) => {
  try {
    const users = await User.find({ chatId: { $exists: true, $ne: null } });
    const stats = { total: users.length, sent: 0, failed: 0, blocked: 0 };

    for (const user of users) {
      try {
        await sendAdvert(req.body, user.chatId);
        stats.sent++;
      } catch (e) {
        const retryAfter = e.response?.body?.parameters?.retry_after;

        // Телеграм просить почекати — пробуємо ще раз
        if (retryAfter) {
          await sleep(retryAfter * 1000);
          try {
            await sendAdvert(req.body, user.chatId);
            stats.sent++;
            continue;
          } catch (retryError) {
            e = retryError;
          }
        }

        stats.failed++;
        // 403 — користувач заблокував бота або видалив акаунт
        if (e.response?.statusCode === 403) stats.blocked++;
        console.error(`❌ Не надіслано ${user.chatId}:`, e.response?.body?.description || e.message);
      }
    }

    console.log(`📨 Розсилка: надіслано ${stats.sent} з ${stats.total}, помилок ${stats.failed}`);
    return res.json(stats);
  } catch (e) {
    console.error("❌ Помилка надсилання:", e);
    return res.status(500).json({ message: e.message || "Помилка на сервері" });
  }
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Сервер зі сторони телеграм боту ${PORT}`);
});
