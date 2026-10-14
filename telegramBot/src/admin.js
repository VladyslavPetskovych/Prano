const redisClient = require("./redis");

// Номери лише цифрами, без "+"
// Повний доступ менеджера: панель замовлень, сповіщення про нові замовлення, звіти
const ADMIN_PHONE = "380983405578";
// Доступ лише до звітів Agbis
const REPORT_PHONES = [ADMIN_PHONE, "380968209449", "380674264506"];

const ADMIN_CHAT_KEY = "admin:chatId";
// Хеш номер -> chatId: один номер має рівно один чат, повторний вхід замінює попередній
const REPORT_CHATS_KEY = "reports:chatByPhone";
const MANAGER_BUTTON = "👨‍💼 Менеджер";
const REPORT_BUTTON = "📊 Звіт";
const WEEK_BUTTON = "📅 Тиждень";
const TRENDS_BUTTON = "📈 Тренди";
const REPORT_ROW = [REPORT_BUTTON, WEEK_BUTTON, TRENDS_BUTTON];
// Рядки клавіатури: адміну — менеджер і звіти, переглядачу звітів — лише звіти
const ADMIN_ROWS = [[MANAGER_BUTTON], REPORT_ROW];
const REPORT_ROWS = [REPORT_ROW];
const copyRows = (rows) => rows.map((row) => [...row]);

const normalizePhone = (phone = "") => String(phone).replace(/\D/g, "");

// Номер з контакту, лише якщо контакт належить відправнику (а не переслана/чужа картка)
const verifiedContactPhone = (msg) =>
  msg.chat.type === "private" &&
  Boolean(msg.from) &&
  Boolean(msg.contact) &&
  msg.contact.user_id === msg.from.id
    ? normalizePhone(msg.contact.phone_number)
    : null;

const isVerifiedAdminContact = (msg) => verifiedContactPhone(msg) === ADMIN_PHONE;

const isVerifiedReportContact = (msg) => REPORT_PHONES.includes(verifiedContactPhone(msg));

const isOwnPrivateChat = (msg) =>
  msg.chat.type === "private" && Boolean(msg.from) && String(msg.from.id) === String(msg.chat.id);

const isAdmin = async (msg) => {
  if (!isOwnPrivateChat(msg)) return false;

  const adminChatId = await redisClient.get(ADMIN_CHAT_KEY);
  return Boolean(adminChatId) && adminChatId === String(msg.chat.id);
};

// Лише чати номерів зі списку REPORT_PHONES (якщо номер приберуть зі списку — доступ зникне)
const getReportChats = async () => {
  const chatByPhone = await redisClient.hGetAll(REPORT_CHATS_KEY);
  return [
    ...new Set(
      Object.entries(chatByPhone)
        .filter(([phone]) => REPORT_PHONES.includes(phone))
        .map(([, chatId]) => chatId)
    ),
  ];
};

const isReportViewer = async (msg) => {
  if (!isOwnPrivateChat(msg)) return false;

  return (await getReportChats()).includes(String(msg.chat.id));
};

const getAdminChat = () => redisClient.get(ADMIN_CHAT_KEY);

const clearAdminChatIfMatches = async (chatId) => {
  const adminChatId = await redisClient.get(ADMIN_CHAT_KEY);
  if (adminChatId === String(chatId)) await redisClient.del(ADMIN_CHAT_KEY);
};

// Знімає всі права з чату (вихід або вхід з іншим контактом)
const clearChatRoles = async (chatId) => {
  await clearAdminChatIfMatches(chatId);

  const chatByPhone = await redisClient.hGetAll(REPORT_CHATS_KEY);
  for (const [phone, phoneChatId] of Object.entries(chatByPhone)) {
    if (phoneChatId === String(chatId)) await redisClient.hDel(REPORT_CHATS_KEY, phone);
  }
};

// Надає права за перевіреним контактом; повертає рядки кнопок для клавіатури (або порожній список)
const grantRolesFromContact = async (msg) => {
  const chatId = msg.chat.id.toString();
  await clearChatRoles(chatId);

  if (!isVerifiedReportContact(msg)) return [];

  const phone = verifiedContactPhone(msg);
  await redisClient.hSet(REPORT_CHATS_KEY, phone, chatId);

  if (isVerifiedAdminContact(msg)) {
    await redisClient.set(ADMIN_CHAT_KEY, chatId);
    return copyRows(ADMIN_ROWS);
  }
  return copyRows(REPORT_ROWS);
};

// Додає кнопки ролі до клавіатури: адміну — менеджер і звіти, переглядачу звітів — лише звіти
const addManagerButton = async (msg, keyboardButtons) => {
  if (await isAdmin(msg)) keyboardButtons.push(...copyRows(ADMIN_ROWS));
  else if (await isReportViewer(msg)) keyboardButtons.push(...copyRows(REPORT_ROWS));
  return keyboardButtons;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const formatOrder = (order) => {
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleString("uk-UA", { timeZone: "Europe/Kyiv" })
    : "—";

  let text =
    `👤 Клієнт: ${escapeHtml(order.name)}\n` +
    `📞 Телефон: ${escapeHtml(order.phone)}\n`;
  if (order.email) text += `✉️ Email: ${escapeHtml(order.email)}\n`;
  text +=
    `👕 Тип одягу: ${escapeHtml(order.clothType)}\n` +
    `🧴 Послуга: ${escapeHtml(order.productType)}\n`;
  if (order.note) text += `📝 Примітка: ${escapeHtml(order.note)}\n`;
  text += `📅 Створено: ${createdAt}`;

  return text;
};

module.exports = {
  MANAGER_BUTTON,
  REPORT_BUTTON,
  WEEK_BUTTON,
  TRENDS_BUTTON,
  isAdmin,
  isReportViewer,
  getAdminChat,
  getReportChats,
  grantRolesFromContact,
  clearChatRoles,
  addManagerButton,
  escapeHtml,
  formatOrder,
};
