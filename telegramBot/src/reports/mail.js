const { ImapFlow } = require("imapflow");
require("dotenv").config();

// Звіти Agbis надсилаються з цієї скриньки щовечора листом "звіт ДД.ММ.РРРР" з Отчеты.zip
const REPORT_SUBJECT = /^\s*звіт\s+(\d{2}\.\d{2}\.\d{4})/i;
const MAX_ZIP_BYTES = 60 * 1024 * 1024;

const isConfigured = () =>
  Boolean(process.env.REPORTS_EMAIL_USER && process.env.REPORTS_EMAIL_PASSWORD);

const createClient = () =>
  new ImapFlow({
    host: "imap.gmail.com",
    port: 993,
    secure: true,
    auth: {
      user: process.env.REPORTS_EMAIL_USER,
      pass: process.env.REPORTS_EMAIL_PASSWORD,
    },
    logger: false,
  });

const findZipPart = (node) => {
  if (!node) return null;
  const name = node.dispositionParameters?.filename || node.parameters?.name || "";
  if (node.part && (node.type === "application/zip" || /\.zip$/i.test(name))) {
    return node.part;
  }
  for (const child of node.childNodes || []) {
    const part = findZipPart(child);
    if (part) return part;
  }
  return null;
};

const streamToBuffer = async (stream) => {
  const chunks = [];
  let size = 0;
  for await (const chunk of stream) {
    size += chunk.length;
    if (size > MAX_ZIP_BYTES) throw new Error("Report attachment is too large");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

// Знаходить найновіший лист зі звітом; якщо withZip — також завантажує вкладення
const fetchLatestReport = async ({ withZip = false, days = 7 } = {}) => {
  const client = createClient();
  await client.connect();

  try {
    // Звіти лежать у "Надісланих", тому шукаємо у "Вся пошта"
    const mailboxes = await client.list();
    const allMail = mailboxes.find((box) => box.specialUse === "\\All");
    const lock = await client.getMailboxLock(allMail ? allMail.path : "INBOX", {
      readOnly: true,
    });

    try {
      const uids = await client.search(
        { gmraw: `filename:zip newer_than:${days}d` },
        { uid: true }
      );
      if (!uids || !uids.length) return null;

      const messages = await client.fetchAll(
        uids.slice(-50),
        { envelope: true, bodyStructure: true },
        { uid: true }
      );

      const latest = messages
        .map((message) => ({
          uid: message.uid,
          subject: message.envelope?.subject || "",
          zipPart: findZipPart(message.bodyStructure),
        }))
        .filter((m) => REPORT_SUBJECT.test(m.subject) && m.zipPart)
        .sort((a, b) => b.uid - a.uid)[0];

      if (!latest) return null;

      const report = {
        uid: latest.uid,
        subject: latest.subject.trim(),
        reportDate: latest.subject.match(REPORT_SUBJECT)[1],
      };

      if (withZip) {
        const { content } = await client.download(String(latest.uid), latest.zipPart, {
          uid: true,
        });
        report.zip = await streamToBuffer(content);
      }

      return report;
    } finally {
      lock.release();
    }
  } finally {
    await client.logout().catch(() => client.close());
  }
};

module.exports = { isConfigured, fetchLatestReport };
