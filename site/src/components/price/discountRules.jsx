// ❌ Слова, при яких знижка не діє
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ Категоріальні знижки
export const categoryDiscounts = {
  Хімчистка: 30,
  "Реставрація сумок": 10,
  // "Ремонт взуття": 15, // наприклад — можна просто додавати
};

// Перевірка назви на матеріал
export const isLeatherOrFur = (title = "") => {
  const t = title.toLowerCase();
  return blockedWords.some((w) => t.includes(w));
};

// Отримати відсоток знижки для категорії
export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Розрахунок ціни зі знижкою (якщо дозволено)
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  const base = Number(price);
  const discountPercent = getCategoryDiscount(categoryTitle);

  if (!discountPercent || Number.isNaN(base) || isLeatherOrFur(itemTitle)) {
    return base;
  }

  return Math.round(base - base * (discountPercent / 100));
};
