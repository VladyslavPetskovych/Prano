import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiUrl, getApiOrigin } from "../../../config/apiOrigin";

const PriceAdvertManagement = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { accessToken } = useSelector((state) => state.auth);

  const imageUrl = useMemo(() => {
    if (!image) return null;
    return `${getApiOrigin()}/api/priceAdvertImages/${image}`;
  }, [image]);

  const fetchAdvertImage = async () => {
    try {
      const response = await axios.get(apiUrl("/price-advert"));
      setImage(response.data?.image || null);
    } catch (error) {
      setMessage("Не вдалося завантажити рекламне зображення.");
    }
  };

  useEffect(() => {
    fetchAdvertImage();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Оберіть зображення для завантаження.");
      return;
    }
    if (!accessToken) {
      setMessage("Відсутній токен доступу.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post(apiUrl("/price-advert/image"), formData, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      setImage(response.data?.image || null);
      setSelectedFile(null);
      setMessage("Зображення успішно збережено.");
    } catch (error) {
      setMessage("Не вдалося зберегти зображення.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!accessToken) {
      setMessage("Відсутній токен доступу.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await axios.delete(apiUrl("/price-advert/image"), {
        headers: {
          Authorization: `${accessToken}`,
        },
      });

      setImage(null);
      setSelectedFile(null);
      setMessage("Зображення видалено.");
    } catch (error) {
      setMessage("Не вдалося видалити зображення.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[30vh] p-4 rounded">
      <h3 className="text-xl font-semibold mb-4">Реклама для сторінки цін</h3>

      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="p-2 border rounded bg-white"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-60"
        >
          {loading ? "Збереження..." : "Завантажити"}
        </button>
        <button
          onClick={handleDelete}
          disabled={loading || !image}
          className="px-4 py-2 rounded bg-red-500 text-white disabled:opacity-60"
        >
          Видалити
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}

      {imageUrl && (
        <div className="mt-5 max-w-2xl bg-white border rounded p-3">
          <img
            src={imageUrl}
            alt="Рекламне зображення"
            className="w-full h-auto object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PriceAdvertManagement;
