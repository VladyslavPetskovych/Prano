// components/OrderHistory/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import OrderCard from "./OrderCard";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.auth.userId);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!accessToken || !userId) {
        setError("❌ Користувач не авторизований.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `https://prano.group/api/orders/${userId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      console.log("Fetched orders:", response.data);
      setOrders(response.data);
      sessionStorage.setItem(`orders_${userId}`, JSON.stringify(response.data));
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response.data?.message?.includes("Rate Limit")
      ) {
        setError(
          "🚫 Забагато запитів. Спробуйте ще раз через декілька секунд."
        );
      } else {
        setError("⚠️ Не вдалося отримати замовлення.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = sessionStorage.getItem(`orders_${userId}`);
    if (cached) {
      setOrders(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const timeout = setTimeout(fetchOrders, 800);
    return () => clearTimeout(timeout);
  }, [accessToken, userId]);

  const handleRefresh = () => {
    sessionStorage.removeItem(`orders_${userId}`);
    fetchOrders();
  };

  return (
    <div className="p-6 bg-white rounded-base shadow-md">
      <h2 className="text-xl font-semibold mb-4">Ваші попередні замовлення</h2>

      <button
        onClick={handleRefresh}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        🔄 Оновити замовлення
      </button>

      {loading && <p>⏳ Завантаження замовлень...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && (
        <p>📭 У Вас поки немає замовлень.</p>
      )}
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderHistory;
