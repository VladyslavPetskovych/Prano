import React, { useState } from "react";
import { updateMerchandise, updateMerchandiseOrder } from "./PriceApi";

const PriceServiceItem = ({
  service,
  categories,
  onEditSuccess,
  onDeleteRequest,
}) => {
  const category = Array.isArray(categories?.data)
    ? categories.data.find((cat) => cat._id === service.categoryId)
    : null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    price: service.price,
    secondPrice: service.secondPrice || "",
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

    const updateData = {};
    const updateOrder = formData.order !== service.order;

    if (formData.title !== service.title) updateData.title = formData.title;
    if (formData.price !== service.price)
      updateData.price = Number(formData.price);

    if (formData.secondPrice !== service.secondPrice) {
      if (formData.secondPrice !== "" && formData.secondPrice !== null) {
        updateData.secondPrice = Number(formData.secondPrice);
      }
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
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </td>
          <td className="p-3">
            <input
              type="number"
              name="secondPrice"
              value={formData.secondPrice}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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
          <td className="p-3">{service.price}</td>
          <td className="p-3">{service.secondPrice}</td>
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
