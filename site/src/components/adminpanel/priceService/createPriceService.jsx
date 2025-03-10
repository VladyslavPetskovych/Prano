import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatePriceService = ({ refreshServices }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { accessToken } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (title.length < 3 || title.length > 45) {
      setError("Заголовок має бути від 3 до 45 символів.");
      setLoading(false);
      return;
    }
    if (description.length < 5) {
      setError("Опис має містити не менше 5 символів.");
      setLoading(false);
      return;
    }
    if (!priceFrom || !priceTo || priceFrom <= 0 || priceTo <= priceFrom) {
      setError("Некоректні ціни. 'priceTo' має бути більше за 'priceFrom'.");
      setLoading(false);
      return;
    }
    if (!accessToken) {
      setError("Доступ заборонено. Відсутній токен.");
      setLoading(false);
      return;
    }

    const serviceData = {
      title,
      description,
      priceFrom: Number(priceFrom),
      priceTo: Number(priceTo),
    };

    try {
      await axios.post("https://prano.group/api/products", serviceData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      alert("Послугу успішно створено!");
      refreshServices(); 
      setTitle("");
      setDescription("");
      setPriceFrom("");
      setPriceTo("");
    } catch (err) {
      setError(
        "Не вдалося створити послугу. Перевірте дані та спробуйте ще раз."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[50vh] flex items-center justify-center p-5 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[100%] md:w-[50%]">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Створити послугу
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Ціна від"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="number"
            placeholder="Ціна до"
            value={priceTo}
            onChange={(e) => setPriceTo(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 w-full text-white p-2"
            disabled={loading}
          >
            {loading ? "Створюється..." : "Додати послугу"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePriceService;
