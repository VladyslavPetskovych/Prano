// Попередній перегляд змін цін: порівнює файли з data/price-changes з тим, що зараз на сайті.
// Нічого не змінює — лише читає публічне API.
//   npm run price-changes:check                      — усі файли
//   npm run price-changes:check -- 2026-10-28-x.json — конкретний файл
const {
  readPriceChangeFiles,
  planPriceChanges,
  describeOperation,
} = require("../src/utils/priceChanges.util");

const API = process.env.PRICE_API || "https://prano.group/api";

const getList = async (path) => {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
  const json = await res.json();
  return Array.isArray(json) ? json : json.data;
};

const main = async () => {
  const only = process.argv.slice(2);
  const files = readPriceChangeFiles().filter(({ file }) => !only.length || only.includes(file));
  if (!files.length) {
    console.log("Файлів зі змінами не знайдено");
    return;
  }

  const [categories, merchandises] = await Promise.all([getList("/categories"), getList("/merchandises")]);
  let hasErrors = false;

  for (const { file, description, changes } of files) {
    const { operations, errors } = planPriceChanges(changes, categories, merchandises);

    console.log(`\n=== ${file}${description ? ` — ${description}` : ""}`);
    operations.forEach((operation) => console.log(describeOperation(operation)));
    if (errors.length) {
      hasErrors = true;
      console.log(`\nПомилки:\n  ${errors.join("\n  ")}`);
    }
  }

  process.exitCode = hasErrors ? 1 : 0;
};

main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
