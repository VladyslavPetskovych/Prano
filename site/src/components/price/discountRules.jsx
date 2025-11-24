// ❌ Слова, при яких знижка не діє ТІЛЬКИ В ХІМЧИСТЦІ
// (тепер НЕ блокує знижку, бо шкіра/хутро отримують -20%)
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ Категоріальні знижки (оновлено)
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

// Отримати відсоток знижки для категорії
export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Застосування знижки
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  const base = Number(price);
  const discountPercent = getCategoryDiscount(categoryTitle);

  // ❗ Якщо ціна не валідна — повертаємо як є
  if (Number.isNaN(base) || !discountPercent) return base;

  const normalizedTitle = itemTitle.toLowerCase().trim();

  // Винятки (залишаємо, якщо треба)
  const isExceptionItem =
    normalizedTitle.includes("шуба штучна") ||
    normalizedTitle.includes("дублянка штучна");

  // ❗ Раніше блокуємо знижку для шкіри/хутра у хімчистці — тепер НІ,
  // бо згідно нового ТЗ має бути -20%

  // Розрахунок
  return Math.round(base - base * (discountPercent / 100));
};