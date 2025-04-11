import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomButton from "../../utils/customButton";
import { useSelector } from "react-redux";

const API_URL = "https://prano.group/api/advertisement";

function AdvertManagement() {
  const [adverts, setAdverts] = useState([]);
  const [newAdvert, setNewAdvert] = useState({
    title: "",
    description: "",
    image: null,
  });
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) fetchAdverts();
  }, [accessToken]);

  const fetchAdverts = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched adverts:", response.data);
      setAdverts(response.data);
    } catch (error) {
      console.error("Error fetching adverts:", error.response || error);
    }
  };

  const createAdvert = async () => {
    const formData = new FormData();
    formData.append("title", newAdvert.title);
    formData.append("description", newAdvert.description);
    if (newAdvert.image) formData.append("image", newAdvert.image);

    try {
      await axios.post(API_URL, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fetchAdverts();
      setNewAdvert({ title: "", description: "", image: null });
    } catch (error) {
      console.error("Error creating advert:", error.response || error);
    }
  };

  const deleteAdvert = async (_id) => {
    try {
      await axios.delete(`${API_URL}/${_id}`, {
        headers: { Authorization: `${accessToken}` },
      });
      fetchAdverts();
    } catch (error) {
      console.error("Error deleting advert:", error.response || error);
    }
  };

  const sendToTelegram = async () => {
    try {
      await axios.post(
        TELEGRAM_API_URL,
        {},
        {
          headers: { Authorization: `${accessToken}` },
        }
      );
      alert("Пропозицію надіслано користувачам в Телеграм");
    } catch (error) {
      console.error(
        "Error sending adverts to Telegram:",
        error.response || error
      );
    }
  };

  return (
    <div className="bg-slate-200 min-h-[50vh] p-6 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Управління пропозиціями</h2>

      <button
        onClick={sendToTelegram}
        className="bg-slate-400 py-2 px-6 rounded hover:bg-blue-300 transition mb-6"
      >
        Надіслати пропозицію користувачам в Телеграм
      </button>

      <div className="flex flex-col md:flex-row mb-6">
        <input
          type="text"
          placeholder="Назва"
          value={newAdvert.title}
          onChange={(e) =>
            setNewAdvert({ ...newAdvert, title: e.target.value })
          }
          className="p-2 mb-2 md:mb-0 md:mr-4 border rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Опис"
          value={newAdvert.description}
          onChange={(e) =>
            setNewAdvert({ ...newAdvert, description: e.target.value })
          }
          className="p-2 mb-2 md:mb-0 md:mr-4 border rounded w-full md:w-1/3"
        />
        <input
          type="file"
          onChange={(e) =>
            setNewAdvert({ ...newAdvert, image: e.target.files[0] })
          }
          className="p-2 mb-2 md:mb-0 md:mr-4 border rounded w-full md:w-1/3"
        />
        <CustomButton onClick={createAdvert} className="mt-4 md:mt-0">
          Додати
        </CustomButton>
      </div>

      <div className="w-full">
        {adverts.map((advert) => (
          <div
            key={advert._id}
            className="p-4 bg-white shadow-md rounded mb-4 flex justify-between items-center"
          >
            <div className="flex flex-col w-full md:w-2/3">
              <h3 className="font-bold text-lg">{advert.title}</h3>
              <p className="text-gray-700">{advert.description}</p>
              <img
                src={`https://prano.group/api/advertisementImages/${advert.image}`}
                alt={advert.title}
                className="w-32 h-auto rounded mt-2"
              />
            </div>
            <button
              onClick={() => deleteAdvert(advert._id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Видалити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvertManagement;
