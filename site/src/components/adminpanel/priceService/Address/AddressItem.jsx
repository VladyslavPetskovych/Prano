import React, { useState } from "react";
import { deleteAddress, getAddressImageUrl, updateAddress } from "./AddressApi";
import { rowsToSchedule, scheduleToRows } from "./scheduleUtils";
import { levelToPx, pxToLevel } from "./fontSizeUtils";
import AddressPhotos from "./AddressPhotos";

const AddressItem = ({ address, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: address.name,
    nameFontLevel: pxToLevel(address.nameFontSize),
    phone: address.phone,
    mapUrl: address.mapUrl || "",
    googleMapsUrl: address.googleMapsUrl || "",
    sortOrder: address.sortOrder ?? 0,
    showNewBadge: !!address.showNewBadge,
    isActive: address.isActive !== false,
  });
  const [scheduleRows, setScheduleRows] = useState(
    scheduleToRows(address.schedule)
  );

  const firstImage = address.images?.[0];

  const beginEdit = () => {
    setForm({
      name: address.name,
      phone: address.phone,
      mapUrl: address.mapUrl || "",
      googleMapsUrl: address.googleMapsUrl || "",
      sortOrder: address.sortOrder ?? 0,
      showNewBadge: !!address.showNewBadge,
      isActive: address.isActive !== false,
    });
    setScheduleRows(scheduleToRows(address.schedule));
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const { nameFontLevel, ...rest } = form;
      const updated = await updateAddress(address._id, {
        ...rest,
        sortOrder: Number(form.sortOrder) || 0,
        nameFontSize: levelToPx(nameFontLevel),
        schedule: rowsToSchedule(scheduleRows),
      });
      onUpdate(updated);
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Не вдалося зберегти.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Видалити адресу «${address.name}»?`)) return;
    setLoading(true);
    try {
      await deleteAddress(address._id);
      onDelete(address._id);
    } catch (err) {
      setError(err.response?.data?.message || "Не вдалося видалити.");
    } finally {
      setLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <>
        <tr className="border-b">
          <td className="p-3 align-top w-28">
            {firstImage ? (
              <img
                src={getAddressImageUrl(firstImage)}
                alt=""
                className="w-20 h-20 object-cover rounded border"
              />
            ) : (
              <span className="text-xs text-gray-400">Без фото</span>
            )}
            {address.images?.length > 1 && (
              <span className="text-xs text-gray-500 block mt-1">
                +{address.images.length - 1} фото
              </span>
            )}
          </td>
          <td className="p-3 align-top">
            <div className="font-medium">{address.name}</div>
            {!address.isActive && (
              <span className="text-xs text-red-600">Неактивна</span>
            )}
            {address.showNewBadge && (
              <span className="text-xs text-amber-600 ml-1">NEW</span>
            )}
          </td>
          <td className="p-3 align-top">{address.phone}</td>
          <td className="p-3 align-top text-sm">
            {Object.entries(address.schedule || {}).map(([day, hours]) => (
              <div key={day}>
                {day}: {hours}
              </div>
            ))}
          </td>
          <td className="p-3 align-top">{address.sortOrder ?? 0}</td>
          <td className="p-3 align-top">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={beginEdit}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                ✍️
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                🗑️
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </td>
        </tr>
        <tr className="border-b bg-gray-50">
          <td colSpan={6} className="px-3 pb-3">
            <AddressPhotos address={address} onUpdate={onUpdate} />
          </td>
        </tr>
      </>
    );
  }

  return (
    <tr className="border-b bg-slate-50">
      <td colSpan={6} className="p-4">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <AddressPhotos address={address} onUpdate={onUpdate} />

        <div className="grid md:grid-cols-2 gap-2 mt-4">
          <input
            className="border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="border p-2 rounded md:col-span-2"
            placeholder="Google Maps URL"
            value={form.googleMapsUrl}
            onChange={(e) =>
              setForm({ ...form, googleMapsUrl: e.target.value })
            }
          />
          <input
            className="border p-2 rounded md:col-span-2"
            placeholder="Embed map URL"
            value={form.mapUrl}
            onChange={(e) => setForm({ ...form, mapUrl: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
          />
          <div className="flex flex-col gap-1 text-sm">
            <span className="whitespace-nowrap">
              Розмір назви: {form.nameFontLevel} / 5
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs">A</span>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                className="w-full accent-blue-500"
                value={form.nameFontLevel}
                onChange={(e) =>
                  setForm({ ...form, nameFontLevel: Number(e.target.value) })
                }
              />
              <span className="text-lg">A</span>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.showNewBadge}
                onChange={(e) =>
                  setForm({ ...form, showNewBadge: e.target.checked })
                }
              />
              NEW
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
              />
              Активна
            </label>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Графік</p>
          {scheduleRows.map((row, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                className="border p-2 rounded flex-1"
                value={row.day}
                onChange={(e) => {
                  const next = [...scheduleRows];
                  next[index] = { ...next[index], day: e.target.value };
                  setScheduleRows(next);
                }}
              />
              <input
                className="border p-2 rounded flex-1"
                value={row.hours}
                onChange={(e) => {
                  const next = [...scheduleRows];
                  next[index] = { ...next[index], hours: e.target.value };
                  setScheduleRows(next);
                }}
              />
              <button
                type="button"
                className="text-red-500 px-2"
                onClick={() =>
                  setScheduleRows(scheduleRows.filter((_, i) => i !== index))
                }
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() =>
              setScheduleRows([...scheduleRows, { day: "", hours: "" }])
            }
          >
            + Рядок графіку
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Збереження..." : "Зберегти"}
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Скасувати
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AddressItem;
