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

app.post("/send", async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const users = await User.find({ chatId: { $exists: true, $ne: null } });

    for (const user of users) {
      await bot.sendMessage(user.chatId, `${title}\n\n${description}`);
      if (image) {
        await bot.sendPhoto(user.chatId, image);
      }
    }

    console.log(`📨 Повідомлення надіслано ${users.length} користувачам`);
    return res.sendStatus(200);
  } catch (e) {
    console.error("❌ Помилка надсилання:", e);
    return res.status(500).json({ message: e.message || "Помилка на сервері" });
  }
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Сервер зі сторони телеграм боту ${PORT}`);
});
