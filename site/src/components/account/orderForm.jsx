import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../redux/orderSlice";

const OrderForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    clothingType: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, clothingType, serviceType } = formData;

    if (!name || !phone || !email || !clothingType || !serviceType) return;

    dispatch(
      addOrder({
        user: email,
        name,
        phone,
        clothingType,
        serviceType,
        date: new Date().toLocaleString(),
      })
    );

    setFormData({
      name: user?.name || "",
      phone: "",
      email: user?.email || "",
      clothingType: "",
      serviceType: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Оформлення замовлення
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
   
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ім'я"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />

        <select
          name="clothingType"
          value={formData.clothingType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
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
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Оберіть тип послуги</option>
          <option value="Хімчистка">Хімчистка</option>
          <option value="Ремонт одягу">Ремонт одягу</option>
          <option value="Прасування">Прасування</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-600 transition"
        >
          Відправити замовлення
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
