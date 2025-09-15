const bot = require("../bot");

module.exports = async (msg) => {
  const chatId = msg.chat.id;

  const info = `
*Пункти прийому:*

🏢 *[Вулиця Липинського, 54, Львів](https://share.google/jOYnBbJyAEzEZpRrb)*
Пн–Пт: 09:00–18:00
Сб–Нд: вихідні

🏢 *[Вулиця Під Дубом, 26а, Львів](https://share.google/4mPF1aXWlHxd3DMvI)*
Пн–Пт: 08:00–20:00
Сб–Нд: 11:00–20:00

🏢 *[Проспект Червоної Калини, 60, Львів](https://share.google/YQEd4nvvd4QF407ok)*
Пн–Пт: 08:00–20:00
Сб–Нд: 11:00–20:00
  `;

  await bot.sendMessage(chatId, info, { parse_mode: "Markdown" });
};
