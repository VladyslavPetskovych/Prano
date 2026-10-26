import React, { useState } from "react";
import QrCode from "./QrCode";
import { fetchCampaignStats, getCampaignUrl } from "./MarketingApi";

const formatDate = (value) =>
  value ? new Date(value).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" }) : "—";

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

          <div className="flex gap-2 mt-3">
            <Counter label="Сканувань QR" value={campaign.qrScans} />
            <Counter label="Унікальних людей" value={campaign.uniqueVisitors} />
            <Counter label="Всього переглядів" value={campaign.views} />
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
                </tr>
              </thead>
              <tbody>
                {stats.map((day) => (
                  <tr key={day.date} className="border-b">
                    <td className="p-1">{new Date(day.date).toLocaleDateString("uk-UA")}</td>
                    <td className="p-1">{day.qrScans}</td>
                    <td className="p-1">{day.uniqueVisitors}</td>
                    <td className="p-1">{day.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default CampaignItem;
