// ❌ Слова, які визначають НЕ текстиль (шкіра/хутро)
// Вони повністю блокують будь-яку знижку
export const blockedWords = [
  "шкіра",
  "шкіря",
  "шкіряне",
  "шкіряний",
  "шкіряна",
  "хутро",
  "хутря",
  "хутряне",
  "хутряний",
  "шуб",
  "дублян",
  "овчина",
];

// ✅ Категорії, де домашній текстиль має бути -20% НА ВСЕ
// (працює через includes, тому можна мати "(кг)" в назві)
export const homeTextileCategoryKeywords = [
  "чистка домашнього текстилю",
  "домашній текстиль",
];

// ✅ Ключові слова для "текстильного одягу" (по назві позиції)
export const textileClothesWords = [
  "піджак",
  "сорочк",
  "смокінг",
  "светр",
  "гольф",
  "кофт",
  "кардиган",
  "жилет",
  "спідниц",
  "сукн",
  "весільн",
  "джинс",
  "штани",
  "шорти",
  "комбінезон",
  "футболк",
  "вишиванк",
  "вишит",
  "корсет", // ✅ додано
  "боді", // ✅ додано
  "топ", // ✅ додано
  "пальт",
  "пончо",
  "куртк",
  "пуховик",
  "плащ",
  "вітровк",
  "світшот",
  "худі",
  "краватк",
  "халат",
  "купальник",
  "бюстгальтер",
  "трус",
  "легінс",
  "лосін",
  "колгот",
  "поло",
  "фата",
  "хустк",
  "шарф",
  "шкарпет",
  "рукавичк",
  "берет",
  "панам",
  "шапк",
  "кепк",
  "ремінь",
];

// ❌ Слова, які точно НЕ мають отримувати -20% (взуття/сумки/килими/валіза)
export const excludedWords = [
  "взутт",
  "кросівк",
  "кросівок",
  "кеди",
  "кед",
  "туфл",
  "черевик",
  "черевиків",
  "чобіт",
  "угг",
  "сандал",
  "босоніж",
  "шльопан",
  "лофер",
  "балетк",
  "ботин",

  "сумк",
  "рюкзак",
  "гаманець",
  "валіз",

  "килим",
  "ковер",
  "доріжк",
];

// helpers
const norm = (s = "") => String(s).toLowerCase().trim();

export const isLeatherOrFur = (title = "") => {
  const t = norm(title);
  return blockedWords.some((w) => t.includes(w));
};

export const hasAny = (text = "", words = []) => {
  const t = norm(text);
  return words.some((w) => t.includes(norm(w)));
};

export const isHomeTextileCategory = (categoryTitle = "") => {
  const c = norm(categoryTitle);
  return homeTextileCategoryKeywords.some((k) => c.includes(norm(k)));
};

export const isTextileClothesItem = (itemTitle = "") => {
  const t = norm(itemTitle);
  if (hasAny(t, excludedWords)) return false; // взуття/сумки/килими — точно ні
  return hasAny(t, textileClothesWords);
};

// ✅ Основне правило
export const applyDiscount = (price, itemTitle = "", categoryTitle = "") => {
  const base = Number(price);
  if (Number.isNaN(base)) return base;

  // 1) ❗ шкіра/хутро — знижки НЕМА завжди
  if (isLeatherOrFur(itemTitle)) return base;

  // 2) ✅ домашній текстиль: -20% на все в категорії
  if (isHomeTextileCategory(categoryTitle)) {
    return Math.round(base - base * 0.2);
  }

  // 3) ✅ текстильний одяг: -20% по назві позиції
  if (isTextileClothesItem(itemTitle)) {
    return Math.round(base - base * 0.2);
  }

  // 4) все решта — як є
  return base;
};
