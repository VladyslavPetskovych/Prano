// Автоспівставлення описів продуктів до категорій за назвою (фаззі-матч).

const STOPWORDS = new Set([
  "та","і","й","по","для","з","у","в","на","до","або","про","від"
]);

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[()'",.:;!?/\\\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s) =>
  normalize(s)
    .split(" ")
    .filter((t) => t && !STOPWORDS.has(t) && t.length > 2);

const scoreTitles = (a, b) => {
  const na = normalize(a);
  const nb = normalize(b);
  if (!na || !nb) return 0;

  if (na === nb) return 1;

  let s = 0;
  if (na.includes(nb) || nb.includes(na)) s += 0.35;

  const ta = new Set(tokenize(a));
  const tb = new Set(tokenize(b));
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  const base = Math.max(ta.size, tb.size) || 1;
  s += inter / base;

  return Math.min(1, s);
};

/**
 * buildMatchedDescriptions
 * @param {Array} categories [{_id, title}]
 * @param {Array} products [{title, description}]
 * @param {number} threshold 0..1
 * @returns {Object} { [categoryId]: description }
 */
export function buildMatchedDescriptions(categories, products, threshold = 0.45) {
  const map = {};
  if (!Array.isArray(categories) || !Array.isArray(products)) return map;

  categories.forEach((cat) => {
    let best = null;
    let bestScore = 0;

    products.forEach((p) => {
      const sc = scoreTitles(cat.title, p.title || "");
      if (sc > bestScore) {
        bestScore = sc;
        best = p;
      }
    });

    if (best && bestScore >= threshold) {
      map[cat._id] = best.description;
    }
  });

  return map;
}
