import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "./PriceApi";
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
    if (!newCategory) return;

    try {
      const response = await createCategory(newCategory, accessToken);
      console.log("Created category:", response.data);

      setCategories((prev) => ({
        ...prev,
        [response.data._id]: response.data,
      }));

      setNewCategory("");
    } catch (error) {
      console.error(
        "Failed to create category:",
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
      console.error("Failed to delete category:", error);
    }
  };

  return {
    categories,
    handleAddCategory,
    handleDeleteCategory,
  };
};

export default useCategoryManager;
