import React, { useEffect, useState } from "react";
import { fetchPriceHistory } from "./PriceApi";

const PAGE_SIZE = 50;

const FIELD_LABELS = {
  title: "Назва",
  price: "Стандарт",
  secondPrice: "Преміум",
  discountPercent: "Знижка, %",
  quantity: "Одиниця",
};

const ACTION_LABELS = {
  create: { text: "Додано", className: "bg-green-100 text-green-800" },
  update: { text: "Змінено", className: "bg-blue-100 text-blue-800" },
  delete: { text: "Видалено", className: "bg-red-100 text-red-800" },
};

// Позиції «лише Преміум» мають невидимий символ замість стандартної ціни
const showValue = (value) => {
  const text = String(value ?? "").replace(/\u{E0020}/gu, "").trim();
  return text === "" || text === "null" ? "—" : text;
};

const formatDate = (value) =>
  new Date(value).toLocaleString("uk-UA", { dateStyle: "short", timeStyle: "short" });

const showSource = (entry) => {
  if (entry.source?.startsWith("file:")) return `Файл ${entry.source.slice(5)}`;
  const user = entry._userId;
  return user ? user.name || user.phone || "Адмін" : "Адмін";
};

const PriceHistory = () => {
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (nextPage, nextQuery) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchPriceHistory({ search: nextQuery, page: nextPage, limit: PAGE_SIZE });
      setEntries((prev) => (nextPage === 1 ? result.data : [...prev, ...result.data]));
      setTotal(result.total);
      setPage(nextPage);
    } catch (err) {
      console.error("Error fetching price history:", err.response || err);
      setError("Не вдалося завантажити історію цін");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1, query);
  }, [query]);

  // Пошук запускаємо з невеликою паузою, щоб не робити запит на кожну літеру
  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="my-3">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за назвою позиції або категорією"
          className="p-2 border rounded w-full md:w-96"
        />
        <p className="text-sm text-gray-500">Записів: {total}</p>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md text-sm">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-3 text-left">Дата</th>
              <th className="p-3 text-left">Позиція</th>
              <th className="p-3 text-left">Дія</th>
              <th className="p-3 text-left">Було → стало</th>
              <th className="p-3 text-left">Хто</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id} className="border-b align-top">
                <td className="p-3 whitespace-nowrap">{formatDate(entry.createdAt)}</td>
                <td className="p-3">
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-xs text-gray-500">{entry.category}</p>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs ${ACTION_LABELS[entry.action]?.className}`}>
                    {ACTION_LABELS[entry.action]?.text || entry.action}
                  </span>
                </td>
                <td className="p-3">
                  {entry.changes.map((change) => (
                    <p key={change.field} className="whitespace-nowrap">
                      <span className="text-gray-500">{FIELD_LABELS[change.field] || change.field}:</span>{" "}
                      {entry.action === "update" && (
                        <>
                          <span className="line-through text-gray-400">{showValue(change.from)}</span> →{" "}
                        </>
                      )}
                      <span className="font-semibold">
                        {entry.action === "delete" ? showValue(change.from) : showValue(change.to)}
                      </span>
                    </p>
                  ))}
                </td>
                <td className="p-3 text-gray-600">{showSource(entry)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!loading && entries.length === 0 && (
        <p className="text-center text-gray-500 my-6">
          {query ? "Нічого не знайдено" : "Змін цін ще не було"}
        </p>
      )}

      {entries.length < total && (
        <div className="flex justify-center my-4">
          <button
            onClick={() => load(page + 1, query)}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {loading ? "Завантаження..." : "Показати ще"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceHistory;
