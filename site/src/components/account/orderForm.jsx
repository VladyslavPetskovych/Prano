import React, { useState, useEffect } from "react";
import CheckBox from "./checkBox";
import OrderRequest from "./orderRequest";

const OrderForm = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
    productType: "", // <-- was "clothingType"
    clothType: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
        note: "",
        productType: "", // <-- also changed here
        clothType: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Відправка замовлення...");

    try {
      const response = await OrderRequest(formData);
      setMessage("Замовлення успішно оформлено!");
      console.log("Order successful:", response);
      // Optionally reset form here
    } catch (error) {
      setMessage("Помилка при оформленні замовлення. Спробуйте ще раз.");
      console.error("Order failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl transition-all duration-300">
      <h2 className="md:text-3xl text-2xl font-bold font-roboto text-Ndark text-center mb-8 relative after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue">
        Оформлення замовлення
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ім'я"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        />
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Додаткові побажання"
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <select
          name="clothType"
          value={formData.clothType}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
          required
        >
          <option value="">Оберіть тип одягу</option>
          <option value="Футболка">Футболка</option>
          <option value="Штани">Штани</option>
          <option value="Куртка">Куртка</option>
          <option value="Сукня">Сукня</option>
        </select>

        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
          disabled={!isChecked || isLoading}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition duration-300 ${
            isChecked && !isLoading
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Відправка..." : "Оформити замовлення"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-800 mt-4">{message}</p>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
