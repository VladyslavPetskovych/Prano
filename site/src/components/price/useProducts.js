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
        const list = res.data?.data || [];
        setProducts(
          [...list].sort((a, b) => {
            const ao = a.order != null ? a.order : Number.MAX_SAFE_INTEGER;
            const bo = b.order != null ? b.order : Number.MAX_SAFE_INTEGER;
            if (ao !== bo) return ao - bo;
            const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return at - bt;
          })
        );
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
