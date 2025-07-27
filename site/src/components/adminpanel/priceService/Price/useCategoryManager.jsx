import { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "./PriceApi";
import { useSelector } from "react-redux";

const useCategoryManager = (newCategory, setNewCategory) => {
  const [categories, setCategories] = useState({});
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      console.log("Fetching categories with accessToken:", accessToken);
      getCategories(accessToken)
        .then((res) => {
          console.log("Categories fetched successfully:", res.data);
          const array = Array.isArray(res.data.data) ? res.data.data : [];

          const categoryObj = array.reduce((acc, item) => {
            acc[item._id] = item;
            return acc;
          }, {});
          setCategories(categoryObj);
          console.log("Categories state set:", categoryObj);
        })
        .catch((err) => {
          console.error("Помилка завантаження категорій", err);
        });
    }
  }, [accessToken]);

  const handleAddCategory = async () => {
    if (!newCategory || newCategory.trim().length < 2) return;

    try {
      const response = await createCategory(newCategory.trim(), accessToken);
      console.log("✅ Створено категорію:", response.data);

      setCategories((prev) => ({
        ...prev,
        [response.data._id]: response.data,
      }));

      setNewCategory("");
    } catch (error) {
      console.error(
        "❌ Помилка створення категорії:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id, accessToken);
      setCategories((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error("❌ Помилка видалення категорії:", error);
    }
  };

  const handleEditCategory = async (id, newTitle) => {
    if (!newTitle || newTitle.trim().length < 2) return;

    try {
      await updateCategory(id, newTitle.trim(), accessToken);
      setCategories((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          title: newTitle.trim(),
        },
      }));
    } catch (error) {
      console.error("❌ Помилка при оновленні категорії:", error);
    }
  };

  return {
    categories,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
  };
};

export default useCategoryManager;
