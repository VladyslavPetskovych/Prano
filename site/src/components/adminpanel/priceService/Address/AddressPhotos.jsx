import React, { useEffect, useState } from "react";
import {
  deleteAddressImage,
  getAddressImageUrl,
  uploadAddressImages,
} from "./AddressApi";

const AddressPhotos = ({ address, onUpdate, compact = false }) => {
  const [images, setImages] = useState(address.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages(address.images || []);
  }, [address._id, address.images]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoading(true);
    setError(null);
    try {
      const updated = await uploadAddressImages(address._id, files);
      setImages(updated.images || []);
      onUpdate?.(updated);
      e.target.value = "";
    } catch (err) {
      setError(
        err.response?.data?.message || "Не вдалося завантажити фото."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imagePath) => {
    if (!window.confirm("Видалити це фото?")) return;

    setLoading(true);
    setError(null);
    try {
      const updated = await deleteAddressImage(address._id, imagePath);
      setImages(updated.images || []);
      onUpdate?.(updated);
    } catch (err) {
      setError(err.response?.data?.message || "Не вдалося видалити фото.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={compact ? "" : "py-2"}>
      {!compact && (
        <p className="text-sm font-medium text-gray-700 mb-2">
          Фото пункту ({images.length})
        </p>
      )}

      <div className="flex flex-wrap items-end gap-3">
        {images.map((img) => (
          <div key={img} className="relative group">
            <img
              src={getAddressImageUrl(img)}
              alt=""
              className={`object-cover rounded border border-gray-300 ${
                compact ? "w-16 h-16" : "w-28 h-28"
              }`}
            />
            <button
              type="button"
              title="Видалити фото"
              onClick={() => handleDelete(img)}
              disabled={loading}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full leading-none disabled:opacity-50"
            >
              ×
            </button>
          </div>
        ))}

        {images.length === 0 && (
          <span className="text-xs text-gray-500 italic">Немає фото</span>
        )}

        <label
          className={`inline-flex flex-col cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <span className="text-xs text-blue-600 mb-1">
            {loading ? "Завантаження..." : "+ Додати фото"}
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="text-xs max-w-[140px]"
            onChange={handleUpload}
            disabled={loading}
          />
        </label>
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default AddressPhotos;
