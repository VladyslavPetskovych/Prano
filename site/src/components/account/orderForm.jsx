import React, { useState, useEffect } from "react";
import CheckBox from "./checkBox";
import OrderRequest from "./orderRequest";
import axios from "axios";

const OrderForm = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clothTypes, setClothTypes] = useState([]); // збережемо типи одягу

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    // email: "",
    note: "",
    productType: "",
    clothType: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        // email: user.email || "",
        note: "",
        productType: "",
        clothType: "",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchMerchandises = async () => {
      try {
        const response = await axios.get("/api/merchandises");
        console.log("Merchandises:", response.data);

        // беремо саме масив data
        setClothTypes(response.data.data || []);
      } catch (error) {
        console.error("Помилка при завантаженні merchandises:", error);
      }
    };

    fetchMerchandises();
  }, []);

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
    } catch (error) {
      setMessage("Помилка при оформленні замовлення. Спробуйте ще раз.");
      console.error("Order failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const field =
    "w-full p-3.5 border border-lightGray rounded-xl bg-pureWhite font-manrope text-sm text-Ndark placeholder:text-mediumGray focus:ring-2 focus:ring-Nblue/25 focus:border-Nblue focus:outline-none transition";

  return (
    <div className="w-full">
      <h2 className="text-2xl sm:text-3xl font-bold font-tinos text-Ndark text-center mb-2">
        Оформлення замовлення
      </h2>
      <p className="text-center font-manrope text-sm text-coolBlue mb-8 max-w-md mx-auto">
        Заповніть форму — ми звʼяжемося з вами для уточнень.
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ім'я"
          className={field}
          required
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Телефон"
          className={field}
          required
        />
        {/*<input*/}
        {/*  type="email"*/}
        {/*  name="email"*/}
        {/*  value={formData.email}*/}
        {/*  onChange={handleChange}*/}
        {/*  placeholder="Email"*/}
        {/*  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"*/}
        {/*  required*/}
        {/*/>*/}
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Додаткові побажання"
          className={field}
          rows={3}
        />

        <select
          name="clothType"
          value={formData.clothType}
          onChange={handleChange}
          className={field}
          required
        >
          <option value="">Оберіть тип одягу</option>
          {clothTypes.map((item) => (
            <option key={item._id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>

        <select
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className={field}
          required
        >
          <option value="">Оберіть тип послуги</option>
          <option value="Хімчистка">Хімчистка</option>
          <option value="Хімчистка">Прання</option>
          <option value="Ремонт одягу">Чистка взуття</option>
          <option value="Ремонт одягу">Реставрація взуття</option>
          <option value="Прасування">Ремонт одягу</option>
          <option value="Ремонт одягу">Реставрація сумок</option>
        </select>

        <CheckBox
          isChecked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />

        <button
          type="submit"
          disabled={
            !isChecked ||
              isLoading ||
              formData.name === "" ||
              formData.phone === "" ||
              formData.productType === "" ||
              formData.clothType === ""
            }
          className="w-full py-3.5 rounded-xl text-base font-manrope font-semibold text-pureWhite bg-Ndark transition duration-300 hover:bg-Ngold hover:text-Ndark disabled:bg-mediumGray disabled:hover:bg-mediumGray disabled:text-pureWhite disabled:cursor-not-allowed disabled:opacity-90"
        >
          {isLoading ? "Відправка..." : "Оформити замовлення"}
        </button>

        {message && (
          <p className="text-center font-manrope text-sm text-Ndark mt-2">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default OrderForm;
