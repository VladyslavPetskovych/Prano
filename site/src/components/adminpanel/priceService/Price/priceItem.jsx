import React, { useState } from "react";
import { updateMerchandise, updateMerchandiseOrder } from "./PriceApi";

const showPriceOrEmpty = (v) => {
  if (v == null) return "";
  const s = String(v).trim();
  if (s === "" || s === "null" || s === "undefined") return "";
  return v;
};

const PriceServiceItem = ({
  service,
  categories,
  onEditSuccess,
  onDeleteRequest,
  layout = "table",
}) => {
  const category = Array.isArray(categories?.data)
    ? categories.data.find((cat) => cat._id === service.categoryId)
    : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    price: service.price == null ? "" : String(service.price),
    secondPrice:
      service.secondPrice == null ? "" : String(service.secondPrice),
    order: service.order || "",
    quantity: service.quantity || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const strNorm = (v) =>
      v == null || v === "" ? "" : typeof v === "string" ? v.trim() : String(v);

    if (strNorm(formData.price) === "") {
      setError("Ціна не може бути порожньою.");
      setLoading(false);
      return;
    }

    const updateData = {};
    const updateOrder = formData.order !== service.order;

    if (formData.title !== service.title) updateData.title = formData.title;

    if (strNorm(formData.price) !== strNorm(service.price)) {
      updateData.price = strNorm(formData.price);
    }

    if (strNorm(formData.secondPrice) !== strNorm(service.secondPrice)) {
      updateData.secondPrice =
        strNorm(formData.secondPrice) === "" ? null : strNorm(formData.secondPrice);
    }

    // 👇 якщо поле змінено, але пусте — відправляємо пусту стрічку
    if (formData.quantity !== service.quantity) {
      updateData.quantity =
        formData.quantity.trim() === "" ? "" : formData.quantity.trim();
    }

    try {
      if (Object.keys(updateData).length > 0) {
        console.log("📦 PATCH на бекенд:", service._id, updateData);
        await updateMerchandise(service._id, updateData);
      }

      if (updateOrder) {
        const orderValue = Number(formData.order);
        await updateMerchandiseOrder(service._id, orderValue);
      }

      setIsEditing(false);
      onEditSuccess({ ...service, ...formData });
    } catch (err) {
      setError(err.response?.data?.message || "Помилка при збереженні.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Ви впевнені, що хочете видалити цю позицію?")) {
      try {
        await onDeleteRequest(service._id);
      } catch (err) {
        console.error("Error deleting item:", err);
      }
    }
  };

  if (layout === "card") {
    return (
      <div className="bg-white border border-gray-300 rounded-md p-3 shadow-sm">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Назва"
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Ціна"
            />
            <input
              type="text"
              name="secondPrice"
              value={formData.secondPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Друга ціна"
            />
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Одиниця виміру"
            />
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Порядок"
            />
            <div className="text-sm text-gray-600">
              Категорія: {category ? category.title : "Немає категорії"}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                💾
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
                disabled={loading}
              >
                ✖
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="font-semibold text-base break-words">{service.title}</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Ціна:</span>{" "}
                <span>{showPriceOrEmpty(service.price)}</span>
              </div>
              <div>
                <span className="text-gray-500">Друга ціна:</span>{" "}
                <span>{showPriceOrEmpty(service.secondPrice) || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500">К-сть:</span>{" "}
                <span>{service.quantity || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500">Порядок:</span>{" "}
                <span>{service.order}</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Категорія:</span>{" "}
              <span>{category ? category.title : "Немає категорії"}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                🗑️
              </button>
            </div>
          </div>
        )}
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <tr className="border-b border-gray-300 text-sm">
      {isEditing ? (
        <>
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="напр. 450 або від 500 ₴"
            />
          </td>
          <td className="p-3">
            <input
              type="text"
              name="secondPrice"
              value={formData.secondPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="необовʼязково"
            />
          </td>
          <td className="p-3">
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="кг або шт"
            />
          </td>
          <td className="p-3">
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </td>
          <td>{category ? category.title : "Немає категорії"}</td>
          <td className="p-3 flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              💾
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-400 text-white rounded"
              disabled={loading}
            >
              ✖
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-3">{service.title}</td>
          <td className="p-3">{showPriceOrEmpty(service.price)}</td>
          <td className="p-3">{showPriceOrEmpty(service.secondPrice)}</td>
          <td className="p-3">{service.quantity || "—"}</td>
          <td className="p-3">{service.order}</td>
          <td>{category ? category.title : "Немає категорії"}</td>
          <td className="p-3 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded"
            >
              ✏️
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              🗑️
            </button>
          </td>
        </>
      )}
      {error && (
        <td colSpan="7" className="text-red-500">
          {error}
        </td>
      )}
    </tr>
  );
};

export default PriceServiceItem;
