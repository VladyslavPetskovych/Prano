import React, { useState } from "react";
import { updateService, deleteService } from "./priceServiceApi.js";

const PriceServiceItem = ({ service, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState({ ...service });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedService({ ...editedService, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    const payload = {};

    if (editedService.title !== service.title)
      payload.title = editedService.title;
    if (editedService.description !== service.description)
      payload.description = editedService.description;
    if (editedService.priceFrom !== service.priceFrom)
      payload.priceFrom = Number(editedService.priceFrom);
    if (editedService.priceTo !== service.priceTo)
      payload.priceTo = Number(editedService.priceTo);

    const response = await updateService(service._id, payload);
    if (response.success) {
      onEditSuccess(editedService);
      setIsEditing(false);
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити послугу?")) return;

    setLoading(true);
    const response = await deleteService(service._id);
    if (response.success) {
      onDeleteSuccess(service._id);
    } else {
      alert(response.message);
    }
    setLoading(false);
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-3">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedService.title}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        ) : (
          service.title
        )}
      </td>

      <td className="p-3 w-64 break-words">
        {isEditing ? (
          <input
            type="text"
            name="description"
            value={editedService.description}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        ) : (
          <div className="whitespace-pre-wrap break-words">
            {service.description}
          </div>
        )}
      </td>

      <td className="p-2">
        {isEditing ? (
          <input
            type="number"
            name="priceFrom"
            value={editedService.priceFrom}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        ) : (
          `Від ${service.priceFrom}`
        )}
      </td>

      <td className="p-2">
        {isEditing ? (
          <input
            type="number"
            name="priceTo"
            value={editedService.priceTo}
            onChange={handleChange}
            className="border p-1 w-full"
          />
        ) : (
          `До ${service.priceTo} `
        )}
      </td>

      <td className="p-3 flex gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
              disabled={loading}
            >
              {loading ? "Збереження..." : "Зберегти"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              disabled={loading}
            >
              Скасувати
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Змінити
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              disabled={loading}
            >
              {loading ? "Видалення..." : "Видалити"}
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default PriceServiceItem;
