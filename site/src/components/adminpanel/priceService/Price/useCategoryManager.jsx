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

          const sorted = [...array].sort((a, b) => {
            const ao = a.order != null ? a.order : Number.MAX_SAFE_INTEGER;
            const bo = b.order != null ? b.order : Number.MAX_SAFE_INTEGER;
            if (ao !== bo) return ao - bo;
            const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return at - bt;
          });
          const categoryObj = sorted.reduce((acc, item) => {
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
      const { data } = await updateCategory(
        id,
        { title: newTitle.trim() },
        accessToken
      );
      setCategories((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          ...data,
        },
      }));
    } catch (error) {
      console.error("❌ Помилка при оновленні категорії:", error);
    }
  };

  const handleUpdateCategoryOrder = async (id, order) => {
    const num = Number(order);
    if (!Number.isFinite(num) || num < 0) return;

    try {
      const { data } = await updateCategory(id, { order: num }, accessToken);
      setCategories((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          ...data,
        },
      }));
    } catch (error) {
      console.error("❌ Помилка при зміні порядку категорії:", error);
    }
  };

  const handleToggleCategoryVisibility = async (id, isActive) => {
    try {
      const { data } = await updateCategory(id, { isActive }, accessToken);
      setCategories((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          ...data,
        },
      }));
    } catch (error) {
      console.error("❌ Помилка при зміні видимості категорії:", error);
    }
  };

  return {
    categories,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleUpdateCategoryOrder,
    handleToggleCategoryVisibility,
  };
};

export default useCategoryManager;
