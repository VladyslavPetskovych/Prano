const bot = require("../bot");

module.exports = async (msg) => {
  const chatId = msg.chat.id;

  const info = `
<b>Пункти прийому:</b>

🏢 <a href="https://share.google/jOYnBbJyAEzEZpRrb">Вулиця Липинського, 54, Львів</a>
Пн–Пт: 09:00–18:00
Сб–Нд: вихідні

🏢 <a href="https://share.google/4mPF1aXWlHxd3DMv">Вулиця Під Дубом, 26а, Львів</a>
Пн–Пт: 08:00–20:00
Сб–Нд: 11:00–20:00

🏢 <a href="https://share.google/YQEd4nvvd4QF407ok">Проспект Червоної Калини, 60, Львів</a>
Пн–Пт: 08:00–20:00
Сб–Нд: 11:00–20:00
  `;

  await bot.sendMessage(chatId, info, { parse_mode: "HTML" });
};
