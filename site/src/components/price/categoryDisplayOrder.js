/**
 * Бажаний порядок блоків категорій на сторінці /price (якщо у категорії в адмінці
 * не задано поле order — використовується збіг за назвою з цим списком).
 */
const PRICE_CATEGORY_TITLE_PATTERNS = [
  /хімчистк/i,
  /чистка\s+домашнього\s+текстилю/i,
  /чистка\s+взуття/i,
  /реставрація\s+взуття/i,
  /ремонт\s+одягу/i,
  /реставрація\s+сумок/i,
  /чистка\s+килимів/i,
  /чистка\s+штор|тюл|premium/i,
  /прання\s+домашнього\s+текстилю/i,
];

export function getPriceCategoryPatternIndex(title) {
  const t = String(title || "");
  for (let i = 0; i < PRICE_CATEGORY_TITLE_PATTERNS.length; i++) {
    if (PRICE_CATEGORY_TITLE_PATTERNS[i].test(t)) return i;
  }
  return 10_000;
}
