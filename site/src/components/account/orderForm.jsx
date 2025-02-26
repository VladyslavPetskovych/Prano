import React from "react";

const OrderForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-md mx-auto">
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Відправити замовлення
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
