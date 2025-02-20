import React from "react";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-semibold mb-4">Ваші попередні замовлення</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Поки немає замовлень</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order, index) => (
            <li
              key={index}
              className="p-2 border rounded bg-gray-50"
            >
              <p className="font-semibold">{order.name}</p>
              <p className="text-gray-600">{order.email}</p>
              <p>{order.orderDetails}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
