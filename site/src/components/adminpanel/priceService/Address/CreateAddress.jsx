import React, { useState } from "react";
import { createAddress } from "./AddressApi";
import { rowsToSchedule } from "./scheduleUtils";

const emptyRow = () => ({ day: "", hours: "" });

const CreateAddress = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    mapUrl: "",
    googleMapsUrl: "",
    sortOrder: 0,
    showNewBadge: false,
    isActive: true,
  });
  const [scheduleRows, setScheduleRows] = useState([
    { day: "Пн-Пт", hours: "09:00-20:00" },
    emptyRow(),
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const created = await createAddress({
        ...form,
        sortOrder: Number(form.sortOrder) || 0,
        schedule: rowsToSchedule(scheduleRows),
      });
      onCreated(created);
      setForm({
        name: "",
        phone: "",
        mapUrl: "",
        googleMapsUrl: "",
        sortOrder: 0,
        showNewBadge: false,
        isActive: true,
      });
      setScheduleRows([
        { day: "Пн-Пт", hours: "09:00-20:00" },
        emptyRow(),
      ]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Не вдалося створити адресу."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded border mb-4">
      <h3 className="font-semibold mb-3">Додати пункт прийому</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid md:grid-cols-2 gap-2">
          <input
            className="border p-2 rounded w-full"
            placeholder="Назва (напр. Липинського, 54)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded w-full md:col-span-2"
            placeholder="Посилання Google Maps (для Telegram)"
            value={form.googleMapsUrl}
            onChange={(e) =>
              setForm({ ...form, googleMapsUrl: e.target.value })
            }
          />
          <input
            className="border p-2 rounded w-full md:col-span-2"
            placeholder="URL карти (embed iframe)"
            value={form.mapUrl}
            onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded w-full"
            placeholder="Порядок сортування"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.showNewBadge}
              onChange={(e) =>
                setForm({ ...form, showNewBadge: e.target.checked })
              }
            />
            Позначка NEW
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            Активна на сайті
          </label>
        </div>

        <div className="mt-2">
          <p className="text-sm font-medium mb-1">Графік роботи</p>
          {scheduleRows.map((row, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
                placeholder="Дні (Пн-Пт)"
                value={row.day}
                onChange={(e) => {
                  const next = [...scheduleRows];
                  next[index] = { ...next[index], day: e.target.value };
                  setScheduleRows(next);
                }}
              />
              <input
                className="border p-2 rounded flex-1"
                placeholder="Години"
                value={row.hours}
                onChange={(e) => {
                  const next = [...scheduleRows];
                  next[index] = { ...next[index], hours: e.target.value };
                  setScheduleRows(next);
                }}
              />
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() => setScheduleRows([...scheduleRows, emptyRow()])}
          >
            + Додати рядок графіку
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Створення..." : "Додати адресу"}
        </button>
      </form>
    </div>
  );
};

export default CreateAddress;
