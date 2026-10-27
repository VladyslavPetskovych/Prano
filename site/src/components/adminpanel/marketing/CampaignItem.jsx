import React, { useState } from "react";
import QrCode from "./QrCode";
import { fetchCampaignLeads, fetchCampaignStats, getCampaignUrl } from "./MarketingApi";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" }) : "—";

const SOURCE_LABELS = { qr: "QR-код", link: "Посилання" };

// CSV з ; і BOM — так Excel коректно відкриває кирилицю
const downloadLeadsCsv = (campaign, leads) => {
  const rows = [
    ["Телефон", "Кампанія", "Промокод", "Джерело", "Підтверджено", "Клієнт сайту", "SMS з промокодом"],
    ...leads.map((lead) => [
      lead.phone,
      campaign.name,
      campaign.promoCode,
      SOURCE_LABELS[lead.source],
      formatDate(lead.verifiedAt),
      lead.isExistingUser ? "так" : "ні",
      lead.promoSmsSentAt ? "так" : "ні",
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(";"))
    .join("\n");

  const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `leads-${campaign.slug}.csv`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

function Counter({ label, value }) {
  return (
    <div className="flex-1 bg-slate-100 rounded p-2 text-center">
      <p className="text-2xl font-bold text-Ndark">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function CampaignItem({ campaign, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: campaign.name,
    promoCode: campaign.promoCode,
    title: campaign.title,
    description: campaign.description,
  });
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState(null);
  const [copied, setCopied] = useState(false);

  const pageUrl = getCampaignUrl(campaign.slug);
  const qrUrl = getCampaignUrl(campaign.slug, true);

  const save = async () => {
    const isSaved = await onUpdate(campaign._id, form);
    if (isSaved) setIsEditing(false);
  };

  const toggleStats = async () => {
    if (stats) return setStats(null);
    try {
      setStats(await fetchCampaignStats(campaign._id));
    } catch (error) {
      console.error("Error fetching campaign stats:", error.response || error);
    }
  };

  // Показуємо лише підтверджені номери — непідтверджені не мають цінності для розсилок
  const toggleLeads = async () => {
    if (leads) return setLeads(null);
    try {
      const data = await fetchCampaignLeads(campaign._id);
      setLeads(data.filter((lead) => lead.verified));
    } catch (error) {
      console.error("Error fetching campaign leads:", error.response || error);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 mb-4 ${campaign.isActive ? "" : "opacity-60"}`}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Рекламна кампанія"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Промокод"
                value={form.promoCode}
                onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
                className="p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Заголовок сторінки"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="p-2 border rounded"
              />
              <textarea
                placeholder="Опис пропозиції"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="p-2 border rounded"
              />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold">{campaign.name}</h3>
                <span className="bg-Ngold text-Ndark text-sm font-semibold px-2 py-0.5 rounded">
                  {campaign.promoCode}
                </span>
                {!campaign.isActive && (
                  <span className="bg-gray-300 text-sm px-2 py-0.5 rounded">Вимкнено</span>
                )}
              </div>
              {campaign.title && <p className="font-medium mt-1">{campaign.title}</p>}
              {campaign.description && (
                <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
                  {campaign.description}
                </p>
              )}
            </>
          )}

          <div className="flex items-center gap-2 mt-3 text-sm">
            <a
              href={pageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-Nblue underline truncate"
            >
              {pageUrl}
            </a>
            <button onClick={copyLink} className="text-xs bg-slate-200 px-2 py-1 rounded shrink-0">
              {copied ? "Скопійовано ✓" : "Копіювати"}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            <Counter label="Сканувань QR" value={campaign.qrScans} />
            <Counter label="Унікальних людей" value={campaign.uniqueVisitors} />
            <Counter label="Всього переглядів" value={campaign.views} />
            <Counter label="Підтверджених номерів" value={campaign.verifiedPhones || 0} />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Останній перехід: {formatDate(campaign.lastVisitAt)} · Створено:{" "}
            {formatDate(campaign.createdAt)}
          </p>
        </div>

        <QrCode value={qrUrl} fileName={`qr-${campaign.slug}`} size={160} />
      </div>

      <div className="flex flex-wrap gap-2 mt-4 text-sm">
        {isEditing ? (
          <>
            <button onClick={save} className="bg-Nblue text-white px-3 py-1 rounded hover:bg-blue-600">
              Зберегти
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-slate-200 px-3 py-1 rounded">
              Скасувати
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300">
            Редагувати
          </button>
        )}
        <button onClick={toggleStats} className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300">
          {stats ? "Сховати статистику" : "Статистика за 30 днів"}
        </button>
        <button onClick={toggleLeads} className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300">
          {leads ? "Сховати номери" : "Номери телефонів"}
        </button>
        <button
          onClick={() => onUpdate(campaign._id, { isActive: !campaign.isActive })}
          className="bg-slate-200 px-3 py-1 rounded hover:bg-slate-300"
        >
          {campaign.isActive ? "Вимкнути сторінку" : "Увімкнути сторінку"}
        </button>
        <button
          onClick={() => onDelete(campaign)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-auto"
        >
          Видалити
        </button>
      </div>

      {stats && (
        <div className="mt-4 overflow-x-auto">
          {stats.length === 0 ? (
            <p className="text-sm text-gray-500">За останні 30 днів переходів не було.</p>
          ) : (
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-1">Дата</th>
                  <th className="p-1">Сканувань QR</th>
                  <th className="p-1">Унікальних</th>
                  <th className="p-1">Переглядів</th>
                  <th className="p-1">Номерів</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((day) => (
                  <tr key={day.date} className="border-b">
                    <td className="p-1">{new Date(day.date).toLocaleDateString("uk-UA")}</td>
                    <td className="p-1">{day.qrScans}</td>
                    <td className="p-1">{day.uniqueVisitors}</td>
                    <td className="p-1">{day.views}</td>
                    <td className="p-1">{day.verifiedPhones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {leads && (
        <div className="mt-4 overflow-x-auto">
          {leads.length === 0 ? (
            <p className="text-sm text-gray-500">Підтверджених номерів ще немає.</p>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Підтверджених номерів: {leads.length}</p>
                <button
                  onClick={() => downloadLeadsCsv(campaign, leads)}
                  className="bg-Nblue text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                >
                  Завантажити CSV
                </button>
              </div>
              <table className="w-full text-sm text-center">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-1">Телефон</th>
                    <th className="p-1">Джерело</th>
                    <th className="p-1">Підтверджено</th>
                    <th className="p-1">Клієнт сайту</th>
                    <th className="p-1">SMS з промокодом</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead._id} className="border-b">
                      <td className="p-1 whitespace-nowrap">{lead.phone}</td>
                      <td className="p-1">{SOURCE_LABELS[lead.source]}</td>
                      <td className="p-1">{formatDate(lead.verifiedAt)}</td>
                      <td className="p-1">{lead.isExistingUser ? "так" : "новий"}</td>
                      <td className="p-1">{lead.promoSmsSentAt ? "✓" : "не надіслано"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CampaignItem;
