import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export function useMerchandiseData() {
  const [merchandise, setMerchandise] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const merchRes = await axios.get(
        query
          ? `https://prano.group/api/merchandises?title[regex]=${encodeURIComponent(
              query
            )}&title[options]=i`
          : "https://prano.group/api/merchandises"
      );
      const categoryRes = await axios.get("https://prano.group/api/categories");

      const merchArray = merchRes.data.data || [];
      const categoriesArray = categoryRes.data.data || [];

      setMerchandise(merchArray);
      setCategories(categoriesArray);

      const grouped = {};
      categoriesArray.forEach((cat) => {
        grouped[cat._id] = { title: cat.title, items: [] };
      });
      merchArray.forEach((item) => {
        if (grouped[item.categoryId]) grouped[item.categoryId].items.push(item);
      });
      setGroupedData(grouped);
    } catch (e) {
      setError("Помилка при завантаженні даних");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { merchandise, categories, groupedData, loading, error, fetchData };
}
