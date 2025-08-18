import { useEffect, useState } from "react";
import axios from "axios";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [prodLoading, setProdLoading] = useState(true);
  const [prodError, setProdError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get("https://prano.group/api/products")
      .then((res) => {
        if (!mounted) return;
        setProducts(res.data?.data || []);
        setProdLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setProdError("Помилка завантаження описів послуг");
        setProdLoading(false);
      });
    return () => (mounted = false);
  }, []);

  return { products, prodLoading, prodError };
}
