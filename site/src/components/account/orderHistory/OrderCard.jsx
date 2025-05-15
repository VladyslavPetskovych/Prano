// components/OrderHistory/OrderCard.jsx
import React from "react";
import { formatDate, mapStatus } from "./utils";

const OrderCard = ({ order }) => (
  <div className="border rounded-xl p-4 mb-4 bg-gray-50 shadow-sm">
    <h3 className="font-bold text-lg mb-2">🧾 Замовлення №{order.id}</h3>
    <p>🧍‍♂️ Кількість речей: {order.pieces}</p>
    <p>
      📦 Підсумок:
      <br />
      <span className="whitespace-pre-line">
        {order.summary.replace(/<br>/g, "\n")}
      </span>
    </p>
    <p>💵 Сума: ${order.total}</p>
    <p>📅 Створено: {formatDate(order.createdDate)}</p>
    <p>
      🚚 Доставка: {formatDate(order.deliveryDate)} о {order.deliveryTime}
    </p>
    <p>🧺 Статус: {mapStatus(order.status)}</p>
    <a
      href={`https://cleancloudapp.com/${order.receiptLink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      🔗 Переглянути квитанцію
    </a>
  </div>
);

export default OrderCard;
