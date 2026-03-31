import React, { useState } from "react";
import { updateService, deleteService } from "./ServiceApi";

const PriceServiceItem = ({ service, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
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
          <td colSpan={3} className="text-red-600 text-sm px-3 pb-2">
            {error}
          </td>
        </tr>
      )}
    </>
  );
};

export default PriceServiceItem;
