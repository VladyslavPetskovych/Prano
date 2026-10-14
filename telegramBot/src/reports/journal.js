const path = require("path");
const AdmZip = require("adm-zip");

const MAX_UNZIPPED_BYTES = 200 * 1024 * 1024;
const JOURNAL_FILE = /журнал изменений в заказах.*\.pdf$/i;

// Колонки таблиці "Отчет журнал изменений в заказах" (координата x у PDF)
const COLUMNS = {
  date: [0, 90],
  type: [90, 230],
  order: [230, 280],
  desc: [280, 540],
  deltaSum: [540, 595],
  deltaPay: [595, 640],
  user: [640, 730],
  branch: [730, Infinity],
};
const ROW_TOLERANCE = 7;

// Розпаковує лише потрібні файли (wanted(назва) => true/false)
const unzipReport = (zipBuffer, wanted = () => true) => {
  const entries = new AdmZip(zipBuffer)
    .getEntries()
    .filter((e) => !e.isDirectory && wanted(path.basename(e.entryName)));

  const totalSize = entries.reduce((sum, e) => sum + (e.header.size || 0), 0);
  if (totalSize > MAX_UNZIPPED_BYTES) throw new Error("Report archive is too large");

  return entries.map((entry) => ({
    name: path.basename(entry.entryName),
    data: entry.getData(),
  }));
};

const parseAmount = (value) => Number(String(value).replace(/\s/g, "").replace(",", "."));

const loadPdfjs = () => import("pdfjs-dist/legacy/build/pdf.mjs");

const parseJournalRows = async (pdfBuffer, onProgress = () => {}) => {
  const pdfjs = await loadPdfjs();
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(pdfBuffer),
    isEvalSupported: false,
    verbosity: 0,
  }).promise;

  const rows = [];
  for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber++) {
    const page = await doc.getPage(pageNumber);
    const { items } = await page.getTextContent();
    const words = items
      .filter((item) => item.str.trim())
      .map((item) => ({ x: item.transform[4], y: item.transform[5], text: item.str.trim() }));

    // Кожен рядок таблиці має номер замовлення — використовуємо його як якір рядка
    const anchors = words.filter(
      (w) => w.x >= COLUMNS.order[0] && w.x < COLUMNS.order[1] && /^\d+-\d+$/.test(w.text)
    );

    for (const anchor of anchors) {
      const cell = ([from, to]) =>
        words
          .filter((w) => w.x >= from && w.x < to && Math.abs(w.y - anchor.y) <= ROW_TOLERANCE)
          .sort((a, b) => b.y - a.y || a.x - b.x)
          .map((w) => w.text)
          .join(" ");

      rows.push({
        date: cell(COLUMNS.date).slice(0, 10),
        type: cell(COLUMNS.type),
        order: anchor.text,
        desc: cell(COLUMNS.desc),
        deltaSum: parseAmount(cell(COLUMNS.deltaSum)) || 0,
        user: cell(COLUMNS.user),
        branch: cell(COLUMNS.branch),
      });
    }

    onProgress(pageNumber / doc.numPages);
  }

  await doc.destroy();
  return rows;
};

const summarizeJournal = (rows) => {
  // Суфікс номера замовлення відповідає філії (напр. "-7" — Леоленд)
  const branchBySuffix = {};
  for (const row of rows) {
    if (row.branch) branchBySuffix[row.order.split("-").pop()] = row.branch;
  }
  const branchOf = (row) =>
    row.branch || branchBySuffix[row.order.split("-").pop()] || "Без філії";

  const summary = {
    dates: [...new Set(rows.map((r) => r.date).filter(Boolean))],
    branchBySuffix,
    newOrders: { count: 0, sum: 0, byBranch: {}, biggest: null },
    employees: {},
    statuses: {},
    issueDateChanges: 0,
    reworkReturns: 0,
    cancelledOrders: 0,
    cancelledServices: { count: 0, sum: 0 },
    priceReductions: { count: 0, sum: 0 },
  };

  for (const row of rows) {
    // Філії пишуть опис українською або російською ("Новий замовлення … на суму" / "Новый заказ … на сумму")
    const created = row.desc.match(
      /Нов(?:ий|ый) (?:замовлення|заказ) №\S+ на сум(?:у|му) ([\d\s]+(?:[.,]\d+)?)/
    );
    if (row.type === "Создание заказа" || created) {
      const amount = created ? parseAmount(created[1]) : 0;
      const branchName = branchOf(row);
      const branch = (summary.newOrders.byBranch[branchName] ||= { count: 0, sum: 0 });
      summary.newOrders.count++;
      summary.newOrders.sum += amount;
      branch.count++;
      branch.sum += amount;

      if (!summary.newOrders.biggest || amount > summary.newOrders.biggest.amount) {
        summary.newOrders.biggest = { order: row.order, amount, branch: branchName };
      }
      if (row.user) summary.employees[row.user] = (summary.employees[row.user] || 0) + 1;
    }

    const status = row.type.startsWith("Изменение состояния") && row.desc.match(/ на "([^"]+)"/);
    if (status) summary.statuses[status[1]] = (summary.statuses[status[1]] || 0) + 1;

    if (row.type.startsWith("Изменение даты выдачи")) summary.issueDateChanges++;
    if (row.type.startsWith("Возврат")) summary.reworkReturns++;
    if (row.type.startsWith("Отмена заказа")) summary.cancelledOrders++;

    // Рядки "Изменение суммы заказа в меньшую сторону" дублюють ці суми, тому їх не рахуємо
    if (row.type.startsWith("Отмена услуги")) {
      summary.cancelledServices.count++;
      summary.cancelledServices.sum += row.deltaSum;
    }
    if (row.type.startsWith("Изменение суммы услуги") && row.deltaSum < 0) {
      summary.priceReductions.count++;
      summary.priceReductions.sum += row.deltaSum;
    }
  }

  return summary;
};

module.exports = { JOURNAL_FILE, unzipReport, parseJournalRows, summarizeJournal };
