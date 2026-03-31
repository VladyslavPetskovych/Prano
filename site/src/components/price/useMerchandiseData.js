import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { apiUrl } from "../../config/apiOrigin";

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
          ? `${apiUrl("/merchandises")}?title[regex]=${encodeURIComponent(
              query
            )}&title[options]=i`
          : apiUrl("/merchandises")
      );
      const categoryRes = await axios.get(apiUrl("/categories"));

      const merchArray = merchRes.data.data || [];
      const categoriesArray = categoryRes.data.data || [];

      setMerchandise(merchArray);
      setCategories(categoriesArray);

      const grouped = {};
      categoriesArray.forEach((cat) => {
        grouped[cat._id] = {
          title: cat.title,
          order: cat.order,
          items: [],
        };
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
