import { useState } from "react";
import { useSelector } from "react-redux";
import { createMerchandise } from "./PriceApi";

const useMerchandiseForm = (refreshServices) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [secondPrice, setSecondPrice] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { accessToken } = useSelector((state) => state.auth);

  const handleSubmit = async (e, title, price, secondPrice, category) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (title.length < 3 || title.length > 45) {
      setError("Назва має бути від 3 до 45 символів.");
      setLoading(false);
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      setError("Ціна має бути додатнім числом.");
      setLoading(false);
      return;
    }
    if (isNaN(secondPrice) || Number(secondPrice) <= 0) {
      setError("Друга ціна має бути додатнім числом.");
      setLoading(false);
      return;
    }
    if (!category) {
      setError("Оберіть категорію.");
      setLoading(false);
      return;
    }

    try {
      await createMerchandise(
        {
          title,
          price: Number(price),
          secondPrice: Number(secondPrice),
          categoryId: category,
        },
        accessToken
      );

      alert("Товар успішно створено!");
      refreshServices();
      setTitle("");
      setPrice("");
      setSecondPrice("");
      setCategory("");
    } catch (err) {
      setError("Не вдалося створити товар. Перевірте дані.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    price,
    setPrice,
    secondPrice,
    setSecondPrice,
    category,
    setCategory,
    newCategory,
    setNewCategory,
    loading,
    error,
    handleSubmit,
  };
};

export default useMerchandiseForm;
