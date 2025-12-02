// ❌ Слова, які визначають НЕ текстиль (шкіра/хутро)
// Вони повністю блокуєть будь-яку знижку
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// Чи є виріб шкірою/хутром
export const isLeatherOrFur = (title = "") => {
  const t = title.toLowerCase();
  return blockedWords.some((w) => t.includes(w));
};

// Категоріальні знижки: тільки Хімчистка = 50%
export const categoryDiscounts = {
  Хімчистка: 50,
};

export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Основне правило знижки
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  const base = Number(price);
  if (Number.isNaN(base)) return base;

  const normalized = itemTitle.toLowerCase();

  const isBlocked = isLeatherOrFur(normalized); // шкіра/хутро?

  // ❗ Якщо шкіра або хутро — знижка НЕ застосовується взагалі
  if (isBlocked) return base;

  // ❗ Якщо категорія Хімчистка — 50%
  const discountPercent = getCategoryDiscount(categoryTitle);

  if (!discountPercent) return base;

  return Math.round(base - base * (discountPercent / 100));
};
