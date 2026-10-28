const path = require("path");
const fs = require("fs");

// Зміни цін зберігаються в репозиторії як JSON-файли й застосовуються при старті сервера.
// Формат файлу — див. data/price-changes/README.md
const PRICE_CHANGES_DIR = path.join(__dirname, "../../data/price-changes");

// Позиція «лише Преміум» має порожню стандартну ціну (""). Раніше адмінка цього не дозволяла,
// і порожнечу імітували невидимим символом — такі значення теж вважаємо порожніми.
const LEGACY_BLANK_PRICE = "\u{E0020}";

const FIELDS = {
  standard: "price",
  premium: "secondPrice",
  quantity: "quantity",
  discountPercent: "discountPercent",
  newTitle: "title",
};
const DISCOUNTS = [0, 10, 15, 20, 30];

const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim().toLowerCase();

const isBlank = (value) =>
  value == null || String(value).replace(LEGACY_BLANK_PRICE, "").trim() === "" || value === "null";

const displayValue = (value) => {
  if (String(value ?? "").includes(LEGACY_BLANK_PRICE)) return "— (невидимий символ)";
  if (value === "null") return '— (текст "null")';
  return isBlank(value) ? "—" : String(value);
};

const readPriceChangeFiles = () => {
  if (!fs.existsSync(PRICE_CHANGES_DIR)) {
    return [];
  }

  return fs
    .readdirSync(PRICE_CHANGES_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => {
      const content = JSON.parse(fs.readFileSync(path.join(PRICE_CHANGES_DIR, file), "utf8"));
      return { file, description: content.description || "", changes: content.changes || [] };
    });
};

const parseValue = (key, value) => {
  if (key === "standard" || key === "premium") {
    if (value === null || value === "") {
      return { value: key === "standard" ? "" : null };
    }
    if (typeof value === "number" && value >= 0) return { value };
    if (typeof value === "string" && value.trim()) return { value: value.trim() };
    return { error: `${key} має бути числом, текстом або null` };
  }

  if (key === "discountPercent") {
    return DISCOUNTS.includes(value)
      ? { value }
      : { error: `discountPercent може бути лише ${DISCOUNTS.join(", ")}` };
  }

  return typeof value === "string" && value.trim()
    ? { value: value.trim() }
    : { error: `${key} має бути непорожнім текстом` };
};

// Порівнює файл зі станом бази й повертає операції, які треба виконати.
// Чиста функція: однаково працює і з базою (при старті), і з публічним API (попередній перегляд).
const planPriceChanges = (changes, categories, merchandises) => {
  const operations = [];
  const errors = [];
  const plannedTitles = new Set();

  changes.forEach((change, index) => {
    const label = `#${index + 1} «${change.title}»`;
    const { action = "set", category: categoryTitle, title, ...rest } = change;

    if (!["set", "delete"].includes(action)) {
      return errors.push(`${label}: невідома дія "${action}" (можна set або delete)`);
    }
    if (!title || !categoryTitle) {
      return errors.push(`${label}: потрібні поля category і title`);
    }

    const category = categories.find((c) => normalize(c.title) === normalize(categoryTitle));
    if (!category) {
      return errors.push(
        `${label}: категорію "${categoryTitle}" не знайдено. Є: ${categories.map((c) => c.title).join(", ")}`
      );
    }

    const matches = merchandises.filter(
      (m) => String(m.categoryId) === String(category._id) && normalize(m.title) === normalize(title)
    );
    if (matches.length > 1) {
      return errors.push(`${label}: у категорії кілька позицій з такою назвою`);
    }
    const [existing] = matches;

    if (action === "delete") {
      if (!existing) {
        return operations.push({ type: "skip", category: category.title, title, reason: "позиції немає" });
      }
      return operations.push({ type: "delete", id: existing._id, category: category.title, title: existing.title });
    }

    const fields = {};
    for (const [key, value] of Object.entries(rest)) {
      if (!FIELDS[key]) {
        errors.push(`${label}: невідоме поле "${key}" (можна ${Object.keys(FIELDS).join(", ")})`);
        continue;
      }
      const parsed = parseValue(key, value);
      if (parsed.error) errors.push(`${label}: ${parsed.error}`);
      else fields[FIELDS[key]] = parsed.value;
    }

    if (existing) {
      const before = {};
      const after = {};
      for (const [field, value] of Object.entries(fields)) {
        if (String(existing[field] ?? "") !== String(value ?? "")) {
          before[field] = existing[field] ?? null;
          after[field] = value;
        }
      }

      return operations.push(
        Object.keys(after).length
          ? { type: "update", id: existing._id, category: category.title, title: existing.title, before, after }
          : { type: "skip", category: category.title, title: existing.title, reason: "без змін" }
      );
    }

    const key = `${category._id}:${normalize(fields.title || title)}`;
    if (plannedTitles.has(key)) {
      return errors.push(`${label}: позиція двічі створюється в одному файлі`);
    }
    plannedTitles.add(key);

    if (!("price" in fields) && !("secondPrice" in fields)) {
      return errors.push(`${label}: нова позиція — вкажіть standard і/або premium`);
    }

    operations.push({
      type: "create",
      category: category.title,
      title: fields.title || title.trim(),
      after: {
        title: fields.title || title.trim(),
        quantity: fields.quantity || "шт",
        price: "price" in fields ? fields.price : "",
        ...(fields.secondPrice != null && { secondPrice: fields.secondPrice }),
        ...(fields.discountPercent != null && { discountPercent: fields.discountPercent }),
        categoryId: category._id,
      },
    });
  });

  return { operations, errors };
};

const describeOperation = (operation) => {
  const where = `[${operation.category}] ${operation.title}`;

  if (operation.type === "create") {
    const { price, secondPrice, quantity } = operation.after;
    return `+ додати   ${where}: стандарт ${displayValue(price)}, преміум ${displayValue(secondPrice)}, ${quantity}`;
  }
  if (operation.type === "update") {
    const diff = Object.keys(operation.after)
      .map((field) => `${field} ${displayValue(operation.before[field])} → ${displayValue(operation.after[field])}`)
      .join(", ");
    return `~ змінити  ${where}: ${diff}`;
  }
  if (operation.type === "delete") {
    return `- видалити ${where}`;
  }
  return `  пропуск  ${where} (${operation.reason})`;
};

// Застосовує ще не застосовані файли по черзі. Якщо файл має помилки — зупиняємось,
// щоб наступні файли не застосувались поверх незастосованого.
const applyPriceChanges = async () => {
  const { Category, Merchandise, PriceChange } = require("../models");
  const { merchandiseService } = require("../services");

  const appliedFiles = new Set((await PriceChange.find().select("file")).map((log) => log.file));
  const applied = [];

  for (const { file, description, changes } of readPriceChangeFiles()) {
    if (appliedFiles.has(file)) continue;

    const [categories, merchandises] = await Promise.all([
      Category.find().lean(),
      Merchandise.find().lean(),
    ]);
    const { operations, errors } = planPriceChanges(changes, categories, merchandises);

    if (errors.length) {
      console.error(`[price-changes] ${file} не застосовано:\n  ${errors.join("\n  ")}`);
      break;
    }

    const meta = { source: `file:${file}` };
    for (const operation of operations) {
      if (operation.type === "create") {
        const created = await merchandiseService.create(operation.after, meta);
        operation.id = created._id;
      } else if (operation.type === "update") {
        await merchandiseService.updateById(operation.id, operation.after, meta);
      } else if (operation.type === "delete") {
        operation.before = merchandises.find((m) => String(m._id) === String(operation.id));
        await merchandiseService.deleteById(operation.id, meta);
      }
      console.log(`[price-changes] ${file}: ${describeOperation(operation)}`);
    }

    await PriceChange.create({ file, description, operations });
    applied.push(file);
  }

  return applied;
};

module.exports = {
  readPriceChangeFiles,
  planPriceChanges,
  describeOperation,
  applyPriceChanges,
};
