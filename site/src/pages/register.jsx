import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let normalizedPhone = formData.phone.trim();

    // Automatically add "+" if missing
    if (!normalizedPhone.startsWith("+")) {
      normalizedPhone = "+" + normalizedPhone;
    }

    // Валідація номера телефону після нормалізації
    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(normalizedPhone)) {
      newErrors.phone =
        "Невірний формат номера телефону. Приклад: +380981234567";
      hasError = true;
    }

    const newErrors = { phone: "", password: "" };
    let hasError = false;

 
    // Валідація пароля
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Пароль має містити щонайменше 8 символів, включаючи літери та цифри.";
      hasError = true;
    }

    // Перевірка підтвердження пароля
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Паролі не співпадають";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;
    e.preventDefault();

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: normalizedPhone,
      password: formData.password,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "https://prano.group/api/auth/register",
        userData
      );

      dispatch(login(response.data));
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("userId", response.data.userId);

      setMessage(
        "Лист для підтвердження відправлено. Будь ласка, перевірте свою пошту."
      );

      setTimeout(() => navigate("/login"), 10000);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.status === 409) {
        setMessage("Цей email вже зареєстровано. Спробуйте інший.");
      } else {
        setMessage("Сталася помилка. Спробуйте ще раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Реєстрація</h2>
        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ім'я"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          <input
            type="email"
            name="email"
            placeholder="Email адреса"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          <input
            type="text"
            name="phone"
            placeholder="Номер телефону"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторіть пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          <div className="flex justify-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              Вже маєте акаунт? Увійти
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-Nblue text-white py-2 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Завантаження..." : "Зареєструватися"}
          </button>
        </form>
      </div>
    </div>
  );
}
