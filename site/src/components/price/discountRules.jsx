// ❌ Слова, при яких знижка НЕ блокується, але визначають -20%
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ Категоріальні знижки
export const categoryDiscounts = {
  Хімчистка: 50,
  "Реставрація сумок": 20,
  "Реставрація взуття": 20,
  "Чистка шкіряного одягу": 20,
  "Чистка хутра": 20,
};

// Перевірка назв на матеріал
export const isLeatherOrFur = (title = "") => {
  const t = title.toLowerCase();
  return blockedWords.some((w) => t.includes(w));
};

// Отримати знижку категорії
export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Застосування знижки
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  const base = Number(price);
  let discountPercent = getCategoryDiscount(categoryTitle);

  // ❗ Якщо ціна не валідна або категорія без знижки
  if (Number.isNaN(base) || !discountPercent) return base;

  const normalizedTitle = itemTitle.toLowerCase().trim();

  // Винятки (залишаємо)
  const isExceptionItem =
    normalizedTitle.includes("шуба штучна") ||
    normalizedTitle.includes("дублянка штучна");

  // ❗ НОВЕ ПРАВИЛО:
  // Якщо в назві є шкіра/хутро — знижка стає 20% незалежно від категорії (в т.ч. Хімчистка)
  if (!isExceptionItem && isLeatherOrFur(normalizedTitle)) {
    discountPercent = 20;
  }

  // Розрахунок
  return Math.round(base - base * (discountPercent / 100));
};