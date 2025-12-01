// discountRules_and_CategorySection.jsx
// Оновлено: видалено всі інші знижки — залишено лише -50% для категорії "Хімчистка"

// ✅ Категоріальнa знижка — тільки для Хімчистка
export const categoryDiscounts = {
  Хімчистка: 50,
};

// Отримати знижку категорії
export const getCategoryDiscount = (categoryTitle) => {
  return categoryDiscounts[categoryTitle] ?? 0;
};

// Застосування знижки
// Тепер: є знижка лише коли категорія === "Хімчистка" (50%). Всі інші випадки — без змін.
export const applyDiscount = (price, _itemTitle, categoryTitle) => {
  const base = Number(price);
  const discountPercent = getCategoryDiscount(categoryTitle);

  if (Number.isNaN(base) || !discountPercent) return base;

  return Math.round(base - base * (discountPercent / 100));
};

// -----------------------------------------------------------------------------
// Компонент CategorySection (React)
// -----------------------------------------------------------------------------
