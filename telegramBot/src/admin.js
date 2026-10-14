const redisClient = require("./redis");

// Єдиний номер, якому дозволено доступ менеджера (лише цифри, без "+")
const ADMIN_PHONE = "380983405578";
const ADMIN_CHAT_KEY = "admin:chatId";
const MANAGER_BUTTON = "👨‍💼 Менеджер";
const REPORT_BUTTON = "📊 Звіт";
const ADMIN_ROW = [MANAGER_BUTTON, REPORT_BUTTON];

const normalizePhone = (phone = "") => String(phone).replace(/\D/g, "");

// Контакт належить відправнику (а не переслана/чужа картка) і це номер адміна
const isVerifiedAdminContact = (msg) =>
  msg.chat.type === "private" &&
  Boolean(msg.from) &&
  Boolean(msg.contact) &&
  msg.contact.user_id === msg.from.id &&
  normalizePhone(msg.contact.phone_number) === ADMIN_PHONE;

const isAdmin = async (msg) => {
  if (msg.chat.type !== "private" || !msg.from) return false;
  if (String(msg.from.id) !== String(msg.chat.id)) return false;

  const adminChatId = await redisClient.get(ADMIN_CHAT_KEY);
  return Boolean(adminChatId) && adminChatId === String(msg.chat.id);
};

const setAdminChat = (chatId) => redisClient.set(ADMIN_CHAT_KEY, String(chatId));

const getAdminChat = () => redisClient.get(ADMIN_CHAT_KEY);

const clearAdminChatIfMatches = async (chatId) => {
  const adminChatId = await redisClient.get(ADMIN_CHAT_KEY);
  if (adminChatId === String(chatId)) await redisClient.del(ADMIN_CHAT_KEY);
};

// Додає кнопку менеджера до клавіатури лише для адміна
const addManagerButton = async (msg, keyboardButtons) => {
  if (await isAdmin(msg)) keyboardButtons.push([...ADMIN_ROW]);
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
  ADMIN_ROW,
  isVerifiedAdminContact,
  isAdmin,
  setAdminChat,
  getAdminChat,
  clearAdminChatIfMatches,
  addManagerButton,
  escapeHtml,
  formatOrder,
};
