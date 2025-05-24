// PriceServiceItem.js
import React, { useState } from "react";

const PriceServiceItem = ({ service, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: service.title,
    price: service.price,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
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
          <td className="p-3">{service.price}</td>
          <td className="p-3 flex gap-2">
          
          </td>
        </>
      )}
      {error && (
        <td colSpan="3" className="text-red-500">
          {error}
        </td>
      )}
    </tr>
  );
};

export default PriceServiceItem;
