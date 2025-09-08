// components/OrderHistory/OrderCard.jsx
import React from "react";

const OrderCard = ({ order }) => {
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("uk-UA")
    : "—";

  return (
    <div className="border rounded-xl p-4 mb-4 bg-gray-50 shadow-sm">
      <h3 className="font-bold text-lg mb-2">🧾 Замовлення</h3>
      <p>👤 Клієнт: {order.name}</p>
      <p>📞 Телефон: {order.phone}</p>
      <p>✉️ Email: {order.email}</p>
      <p>👕 Тип одягу: {order.clothType}</p>
      <p>🧴 Послуга: {order.productType}</p>
      <p>
        📝 Примітка:
        <br />
        <span className="whitespace-pre-line">{order.note || "—"}</span>
      </p>
      <p>📅 Дата створення: {createdAt}</p>
    </div>
  );
};

export default OrderCard;
