const AdmZip = require("adm-zip");

// "Анализ изменений заказов (только суммы заказов).xlsx" — історія змін сум і оплат замовлень
const ANALYSIS_FILE = /анализ изменений заказов.*\.xlsx$/i;

const HEADERS = {
  order: "Номер заказа",
  changeDate: "Дата изменения",
  who: "Кто изменил",
  desc: "Описание изменения",
  paidBefore: "Сумма оплат ДО изменения",
  paidAfter: "Оплата заказа ПОСЛЕ изменения",
  sumAfter: "Сумма заказа ПОСЛЕ изменения",
};

const decodeXml = (text) =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&amp;/g, "&");

const readSharedStrings = (xml) => {
  const strings = [];
  for (const [, body = ""] of xml.matchAll(/<si\s*\/>|<si>([\s\S]*?)<\/si>/g)) {
    const parts = [...body.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]);
    strings.push(decodeXml(parts.join("")));
  }
  return strings;
};

const readRow = (rowXml, strings) => {
  const cells = {};
  for (const [, attrs, body = ""] of rowXml.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const column = attrs.match(/\br="([A-Z]+)\d+"/)?.[1];
    const value = body.match(/<v>([\s\S]*?)<\/v>/)?.[1];
    if (!column) continue;

    const type = attrs.match(/\bt="(\w+)"/)?.[1];
    if (type === "s") cells[column] = value !== undefined ? strings[Number(value)] ?? "" : "";
    else if (type === "inlineStr") cells[column] = decodeXml(body.match(/<t\b[^>]*>([\s\S]*?)<\/t>/)?.[1] || "");
    else if (type === "str") cells[column] = decodeXml(value || "");
    else cells[column] = value !== undefined ? Number(value) : null;
  }
  return cells;
};

// Повертає зміни замовлень; якщо задано dates — лише за ці дати (ДД.ММ.РРРР)
const parseAnalysisRows = (xlsxBuffer, dates = null) => {
  const zip = new AdmZip(xlsxBuffer);
  const sheet = zip.getEntry("xl/worksheets/sheet1.xml");
  if (!sheet) throw new Error("Analysis sheet not found");

  const sharedEntry = zip.getEntry("xl/sharedStrings.xml");
  const strings = sharedEntry ? readSharedStrings(sharedEntry.getData().toString("utf8")) : [];
  const sheetXml = sheet.getData().toString("utf8");

  let columns = null;
  const rows = [];

  for (const [, rowXml = ""] of sheetXml.matchAll(/<row\b[^>]*?(?:\/>|>([\s\S]*?)<\/row>)/g)) {
    const cells = readRow(rowXml, strings);

    // Шапка таблиці повторюється на кожній сторінці — беремо колонки з першої
    if (!columns) {
      const values = Object.entries(cells);
      if (values.some(([, v]) => v === HEADERS.order)) {
        columns = {};
        for (const [key, header] of Object.entries(HEADERS)) {
          columns[key] = values.find(([, v]) => v === header)?.[0];
        }
        if (Object.values(columns).some((c) => !c)) throw new Error("Analysis columns not found");
      }
      continue;
    }

    const order = cells[columns.order];
    const changeDate = cells[columns.changeDate];
    if (typeof order !== "string" || !/^\d+-\d+$/.test(order)) continue;
    if (typeof changeDate !== "string" || (dates && !dates.includes(changeDate))) continue;

    rows.push({
      order,
      changeDate,
      who: cells[columns.who] || "",
      desc: cells[columns.desc] || "",
      paidBefore: Number(cells[columns.paidBefore]) || 0,
      paidAfter: Number(cells[columns.paidAfter]) || 0,
      sumAfter: Number(cells[columns.sumAfter]) || 0,
    });
  }

  if (!columns) throw new Error("Analysis header not found");
  return rows;
};

module.exports = { ANALYSIS_FILE, parseAnalysisRows };
