import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const STATS_URL = "https://prano.group/api/advertisement/stats";

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("uk-UA", {
        timeZone: "Europe/Kyiv",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const percent = (part, total) =>
  total ? `${Math.round((part / total) * 100)}%` : "—";

function StatCard({ label, value, hint }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-2xl font-bold text-gray-900">{value}</span>
      {hint && <span className="text-xs text-gray-500 mt-1">{hint}</span>}
    </div>
  );
}

function AdvertStats({ refreshKey }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(STATS_URL, {
        headers: { Authorization: `${accessToken}` },
      });
      setStats(response.data);
      setError(null);
    } catch (e) {
      console.error("Error fetching advert stats:", e.response || e);
      setError(e.response?.data?.message || "Не вдалося завантажити аналітику");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) fetchStats();
  }, [accessToken, refreshKey, fetchStats]);

  const current = stats?.advertisements?.[0];
  const lastBroadcast = stats?.broadcasts?.[0];

  return (
    <div className="w-full max-w-6xl mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Аналітика</h3>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="text-sm text-blue-600 underline disabled:opacity-50"
        >
          {loading ? "Оновлення..." : "Оновити"}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded bg-red-100 text-red-800">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
            <StatCard
              label="Підписники Телеграм-бота"
              value={stats.subscribers}
            />
            <StatCard
              label="Відкриття пропозиції на сайті"
              value={current ? current.views : "—"}
              hint={
                current
                  ? `Унікальних відвідувачів: ${current.uniqueViewers}. Останнє: ${formatDate(current.lastViewAt)}`
                  : "Немає активної пропозиції"
              }
            />
            <StatCard
              label="Остання розсилка"
              value={
                lastBroadcast
                  ? `${lastBroadcast.sent}/${lastBroadcast.total}`
                  : "—"
              }
              hint={
                lastBroadcast
                  ? `Доставлено ${percent(lastBroadcast.sent, lastBroadcast.total)} · ${formatDate(lastBroadcast.createdAt)}`
                  : "Ще не надсилали"
              }
            />
            <StatCard
              label="Всього розсилок"
              value={stats.telegram.broadcasts}
              hint={`Доставлено повідомлень: ${stats.telegram.sent}, помилок: ${stats.telegram.failed}`}
            />
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left text-gray-600">
                <tr>
                  <th className="px-3 py-2">Дата</th>
                  <th className="px-3 py-2">Пропозиція</th>
                  <th className="px-3 py-2 text-right">Доставлено</th>
                  <th className="px-3 py-2 text-right">Не доставлено</th>
                  <th className="px-3 py-2 text-right">Заблокували бота</th>
                  <th className="px-3 py-2">Хто надіслав</th>
                  <th className="px-3 py-2">Статус</th>
                </tr>
              </thead>
              <tbody>
                {stats.broadcasts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-3 py-4 text-center text-gray-500">
                      Розсилок ще не було
                    </td>
                  </tr>
                )}
                {stats.broadcasts.map((broadcast) => (
                  <tr key={broadcast._id} className="border-t">
                    <td className="px-3 py-2 whitespace-nowrap">
                      {formatDate(broadcast.createdAt)}
                    </td>
                    <td className="px-3 py-2">
                      {broadcast.title}
                      {broadcast.withImage && (
                        <span className="ml-1 text-gray-400">· з фото</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      {broadcast.sent}/{broadcast.total}
                      <span className="ml-1 text-gray-400">
                        ({percent(broadcast.sent, broadcast.total)})
                      </span>
                    </td>
                    <td className="px-3 py-2 text-right">{broadcast.failed}</td>
                    <td className="px-3 py-2 text-right">{broadcast.blocked}</td>
                    <td className="px-3 py-2">
                      {broadcast._userId?.name || broadcast._userId?.email || "—"}
                    </td>
                    <td className="px-3 py-2">
                      {broadcast.status === "done" ? (
                        <span className="text-green-700">Виконано</span>
                      ) : (
                        <span className="text-red-700" title={broadcast.error || ""}>
                          Помилка{broadcast.error ? `: ${broadcast.error}` : ""}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdvertStats;
