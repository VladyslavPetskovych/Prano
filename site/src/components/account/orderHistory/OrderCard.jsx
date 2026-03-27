// components/OrderHistory/OrderCard.jsx
import React from "react";

const OrderCard = ({ order }) => {
  const createdAt = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("uk-UA")
    : "—";

  return (
    <div className="border border-lightGray rounded-xl p-4 mb-3 last:mb-0 bg-lightGray/20 border-l-4 border-l-Ngold">
      <h3 className="font-tinos font-bold text-lg text-Ndark mb-3">
        Замовлення <span className="text-coolBlue text-base">· {createdAt}</span>
      </h3>
      <div className="space-y-1.5 font-manrope text-sm text-logoGray">
        <p>
          <span className="text-mediumGray">Клієнт:</span> {order.name}
        </p>
        <p>
          <span className="text-mediumGray">Телефон:</span> {order.phone}
        </p>
        <p>
          <span className="text-mediumGray">Email:</span> {order.email}
        </p>
        <p>
          <span className="text-mediumGray">Тип одягу:</span>{" "}
          {order.clothType}
        </p>
        <p>
          <span className="text-mediumGray">Послуга:</span> {order.productType}
        </p>
        <p>
          <span className="text-mediumGray">Примітка:</span>
          <br />
          <span className="whitespace-pre-line text-Ndark/90">
            {order.note || "—"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
