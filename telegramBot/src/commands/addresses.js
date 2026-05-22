const bot = require("../bot");

module.exports = async (msg) => {
  const chatId = msg.chat.id;

  const info = `
<b>Пункти прийому:</b>

🏢 <a href="https://share.google/jOYnBbJyAEzEZpRrb">Вулиця Липинського, 54, Львів</a>
📞 <a href="tel:+380771515111">+380771515111</a>
Пн–Пт: 09:00–20:00
Сб: 11:00–20:00
Нд: вихідний

🏢 <a href="https://share.google/4mPF1aXWlHxd3DMv">Вулиця Під Дубом, 26а, Львів</a>
📞 <a href="tel:+380969386418">+380969386418</a>
Пн–Пт: 09:00–20:00
Сб–Нд: 11:00–20:00

🏢 <a href="https://share.google/YQEd4nvvd4QF407ok">Проспект Червоної Калини, 60, Львів</a>
📞 <a href="tel:+380688074310">+380688074310</a>
Пн–Пт: 09:00–20:00
Сб–Нд: 11:00–20:00

🏢 <a href="https://www.google.com/maps/place/Prano/@49.8300069,24.003696,17z">ТРЦ Leoland, вул. Мельника, 18, Львів</a>
📞 <a href="tel:+380687430691">+380687430691</a>
Пн–Пт: 09:00–20:00
Сб–Нд: 11:00–20:00
  `;

  await bot.sendMessage(chatId, info, { parse_mode: "HTML" });
};
