import React, { useState } from "react";
import {
  updateService,
  updateServicePrice,
  deleteService,
} from "./priceServiceApi";

const PriceServiceItem = ({ service, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    priceFrom: service.priceFrom,
    priceTo: service.priceTo,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriceChange = (e) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const textResponse = await updateService(service._id, {
      title: formData.title,
      description: formData.description,
    });

    const priceResponse = await updateServicePrice(service._id, {
      priceFrom: formData.priceFrom,
      priceTo: formData.priceTo,
    });

    if (textResponse.success && priceResponse.success) {
      onEditSuccess({ ...service, ...formData });
      setIsEditing(false);
    } else {
      setError(textResponse.message || priceResponse.message);
    }

    setLoading(false);
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
    <tr className="border-b border-gray-300">
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </td>
          <td className="p-3">
            <input
              type="number"
              name="priceFrom"
              value={formData.priceFrom}
              onChange={handlePriceChange}
              className="w-20 p-2 border border-gray-300 rounded"
            />
            <span className="mx-1">-</span>
            <input
              type="number"
              name="priceTo"
              value={formData.priceTo}
              onChange={handlePriceChange}
              className="w-20 p-2 border border-gray-300 rounded"
            />
          </td>
          <td className="p-3 flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Скасувати
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-3">{service.title}</td>
          <td className="p-3  break-words">{service.description}</td>
          <td className="p-3">
            {service.priceFrom} - {service.priceTo} грн
          </td>
          <td className="p-3 flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              ✍️
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              {loading ? "Видалення..." : "🗑️"}
            </button>
          </td>
        </>
      )}
      {error && (
        <td colSpan="4" className="text-red-500">
          {error}
        </td>
      )}
    </tr>
  );
};

export default PriceServiceItem;
