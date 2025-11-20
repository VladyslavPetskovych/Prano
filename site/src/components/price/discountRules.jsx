// ❌ Слова, при яких знижка не діє ТІЛЬКИ В ХІМЧИСТЦІ
export const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ Категоріальні знижки
export const categoryDiscounts = {
  Хімчистка: 30,
  "Реставрація сумок": 10,
  "Реставрація взуття": 10,
  "Чистка домашнього текстилю": 30,
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

// export const applyDiscount = (price, itemTitle, categoryTitle) => {
//   const base = Number(price);
//   const discountPercent = getCategoryDiscount(categoryTitle);
//
//   // ❗ Якщо ціна не валідна — повертаємо як є
//   if (Number.isNaN(base) || !discountPercent) return base;
//
//   // 🔹 Нормалізуємо назву
//   const normalizedTitle = itemTitle.toLowerCase().trim();
//
//   // ✅ Виняток для цього конкретного товару
//   const isExceptionItem =
//     normalizedTitle.includes("шуба штучна") ||
//     normalizedTitle.includes("дублянка штучна");
//
//   // ❗ Блокуємо знижку для шкіри/хутра ТІЛЬКИ у "Хімчистці",
//   // але пропускаємо виняток навіть якщо є "(без знижки)"
//   if (
//     categoryTitle === "Хімчистка" &&
//     isLeatherOrFur(itemTitle) &&
//     !isExceptionItem
//   ) {
//     return base;
//   }
//
//   // ✅ Для виняткового товару діє 30% знижка
//   return Math.round(base - base * (discountPercent / 100));
// };

// Розрахунок ціни зі знижкою (всі знижки відключені)
export const applyDiscount = (price, itemTitle, categoryTitle) => {
  return Number(price); // повертаємо просто базову ціну
};

