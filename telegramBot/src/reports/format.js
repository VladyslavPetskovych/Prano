const DAY_MS = 24 * 60 * 60 * 1000;

const WEEKDAYS = ["неділя", "понеділок", "вівторок", "середа", "четвер", "пʼятниця", "субота"];
const WEEKDAYS_SHORT = ["нд", "пн", "вт", "ср", "чт", "пт", "сб"];
const MONTHS = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
];

const money = (value) =>
  `${Math.round(value).toLocaleString("uk-UA").replace(/\s/g, " ")} грн`;

// Коротко для графіків: "612 тис.", "1,2 млн"
const moneyShort = (value) => {
  if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(1).replace(".", ",")} млн`;
  if (Math.abs(value) >= 1e3) return `${Math.round(value / 1e3)} тис.`;
  return `${Math.round(value)} грн`;
};

// "ДД.ММ.РРРР" <-> Date (UTC-північ)
const parseDate = (date) => {
  const [day, month, year] = date.split(".").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
};

const formatDate = (date) =>
  [date.getUTCDate(), date.getUTCMonth() + 1]
    .map((n) => String(n).padStart(2, "0"))
    .join(".") + `.${date.getUTCFullYear()}`;

const addDays = (date, days) => new Date(date.getTime() + days * DAY_MS);

const previousDay = (date) => formatDate(addDays(parseDate(date), -1));

// Зміна у відсотках зі стрілкою: "▲ 12%"; порожньо, якщо немає з чим порівняти
const change = (current, previous) => {
  if (!previous) return "";
  const percent = Math.round(((current - previous) / previous) * 100);
  const arrow = percent > 0 ? "▲" : percent < 0 ? "▼" : "•";
  return `${arrow} ${Math.abs(percent)}%`;
};

const bar = (value, max, width = 10) => {
  const filled = max > 0 ? Math.round((Math.max(value, 0) / max) * width) : 0;
  return "▰".repeat(filled) + "▱".repeat(width - filled);
};

// "Каймакова Тетяна Вадимівна" -> "Каймакова Т."
const shortName = (fullName) => {
  const [surname, name] = fullName.split(/\s+/);
  return name ? `${surname} ${name[0]}.` : surname;
};

module.exports = {
  DAY_MS,
  WEEKDAYS,
  WEEKDAYS_SHORT,
  MONTHS,
  money,
  moneyShort,
  parseDate,
  formatDate,
  addDays,
  previousDay,
  change,
  bar,
  shortName,
};
