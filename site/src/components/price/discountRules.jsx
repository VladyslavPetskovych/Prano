// ❌ Слова, при яких знижка не діє ТІЛЬКИ В ХІМЧИСТЦІ
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ Категоріальні знижки
export const categoryDiscounts = {
  Хімчистка: 30,
  "Реставрація сумок": 10,
  "Реставрація взуття": 10,
};

// Перевірка назв на матеріал
export const isLeatherOrFur = (title = "") => {
  const t = title.toLowerCase();
  return blockedWords.some((w) => t.includes(w));
};

// Отримати відсоток знижки для категорії
export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Розрахунок ціни зі знижкою
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  const base = Number(price);
  const discountPercent = getCategoryDiscount(categoryTitle);

  // ❗ Якщо ціна не валідна — повертаємо як є
  if (Number.isNaN(base) || !discountPercent) return base;

  // ❗ Блокуємо знижку для шкіри/хутра ТІЛЬКИ у "Хімчистці"
  if (categoryTitle === "Хімчистка" && isLeatherOrFur(itemTitle)) {
    return base;
  }

  // ✅ В інших категоріях шкіра може мати знижку
  return Math.round(base - base * (discountPercent / 100));
};
