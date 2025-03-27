import React, { useState } from "react";
import CheckBox from "./checkBox";

const OrderForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg   w-full lg:w-[60%]">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Оформлення замовлення
      </h3>
      <form className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <textarea
          type="text"
          name="note"
          placeholder="Додаткові побажання"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />

        <select
          name="clothingType"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          <option value="">Оберіть тип одягу</option>
          <option value="Футболка">Футболка</option>
          <option value="Штани">Штани</option>
          <option value="Куртка">Куртка</option>
          <option value="Сукня">Сукня</option>
        </select>

        <select
          name="serviceType"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          <option value="">Оберіть тип послуги</option>
          <option value="Хімчистка">Хімчистка</option>
          <option value="Ремонт одягу">Ремонт одягу</option>
          <option value="Прасування">Прасування</option>
        </select>
        <CheckBox
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <button
          type="submit"
          disabled={!isChecked} 
          className={`w-full py-3 rounded-lg text-lg font-medium transition duration-300 ${
            isChecked
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Оформити замовлення
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
