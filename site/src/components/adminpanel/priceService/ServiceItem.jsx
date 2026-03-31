import React, { useState } from "react";
import { updateService, deleteService } from "./ServiceApi";

const PriceServiceItem = ({ service, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    order: service.order != null ? String(service.order) : "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const beginEdit = () => {
    setFormData({
      title: service.title,
      description: service.description,
      order: service.order != null ? String(service.order) : "",
    });
    setIsEditing(true);
    setError(null);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      title: formData.title,
      description: formData.description,
    };
    const rawO = formData.order.trim();
    if (rawO !== "") {
      const o = parseInt(rawO, 10);
      if (!Number.isFinite(o) || o < 0) {
        setError("Порядок має бути невідʼємним числом.");
        setLoading(false);
        return;
      }
      payload.order = o;
    }

    const response = await updateService(service._id, payload);

    if (response.success) {
      onEditSuccess({
        ...service,
        ...payload,
        ...(response.data || {}),
      });
      setIsEditing(false);
    } else {
      setError(response.message);
    }

    setLoading(false);
  };

  const handleOrderBlur = async (e) => {
    const raw = e.target.value.trim();
    if (raw === "") return;
    const v = parseInt(raw, 10);
    if (!Number.isFinite(v) || v < 0) return;
    if (v === service.order) return;

    setLoading(true);
    setError(null);
    const response = await updateService(service._id, { order: v });
    setLoading(false);

    if (response.success) {
      onEditSuccess({
        ...service,
        order: v,
        ...(response.data || {}),
      });
    } else {
      setError(response.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Ви впевнені, що хочете видалити цю послугу?")) {
      setLoading(true);
      const response = await deleteService(service._id);
      if (response.success) {
        onDeleteSuccess(service._id);
      } else {
        setError(response.message);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-300">
        {isEditing ? (
          <>
            <td className="p-3 align-top">
            <input
              type="number"
              min={0}
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-20 p-2 border border-gray-300 rounded"
              placeholder="№"
            />
          </td>
          <td className="p-3">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </td>
          <td className="p-3">
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </td>
          <td className="p-3 flex gap-2">
            <button
              type="button"
              onClick={handleSave}
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
          </td>
        </>
      ) : (
        <>
          <td className="p-3 align-top">
            <label className="flex flex-col gap-0.5 text-xs text-gray-600">
              <span>№</span>
              <input
                type="number"
                min={0}
                className="w-20 p-2 border border-gray-300 rounded"
                defaultValue={service.order ?? ""}
                key={`ord-${service._id}-${service.order ?? "x"}`}
                onBlur={handleOrderBlur}
                disabled={loading}
                title="Менше число — вище в списку. Натисніть поза полем, щоб зберегти."
              />
            </label>
          </td>
          <td className="p-3">{service.title}</td>
          <td className="p-3 break-words">{service.description}</td>
          <td className="p-3 flex gap-2">
            <button
              type="button"
              onClick={beginEdit}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              ✍️
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              {loading ? "Видалення..." : "🗑️"}
            </button>
          </td>
        </>
        )}
      </tr>
      {error && (
        <tr className="border-b border-gray-200">
          <td colSpan={4} className="text-red-600 text-sm px-3 pb-2">
            {error}
          </td>
        </tr>
      )}
    </>
  );
};

export default PriceServiceItem;
