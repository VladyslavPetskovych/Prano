import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import RegistrationSuccess from "../components/utils/RegistrationSuccesses";

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
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setErrors({ phone: "", password: "" });

    const newErrors = { phone: "", password: "" };
    let hasError = false;

    const fullPhone = `+380${formData.phone}`;

    if (!formData.phone || formData.phone.length < 9) {
      newErrors.phone = "Введіть номер телефону повністю (9 цифр).";
      hasError = true;
    }

    const backendPhoneRegex =
      /^\(?\+[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})? ?(\w{1,10}\s?\d{1,6})?$/;

    if (!backendPhoneRegex.test(fullPhone)) {
      newErrors.phone =
        "Невірний формат номера. Введіть 9 цифр після +380. Наприклад: 974547862";
      hasError = true;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Пароль має містити щонайменше 8 символів, включаючи літери та цифри.";
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Паролі не співпадають";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: fullPhone,
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

      setSuccess(true); // ✅ показуємо інший компонент
    } catch (error) {
      console.error("Error during registration:", error);

      if (
        error.response?.status === 409 &&
        error.response.data?.message === "User with this phone already exist"
      ) {
        setErrors((prev) => ({
          ...prev,
          phone: "Цей номер телефону вже зареєстровано. Спробуйте інший.",
        }));
      } else if (
        error.response?.status === 409 &&
        error.response.data?.message === "User with this email already exist"
      ) {
        setMessage("Цей email вже зареєстровано. Спробуйте інший.");
      } else {
        setMessage("Сталася помилка. Спробуйте ще раз.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) return <RegistrationSuccess />;

  return (
    <div className="min-h-dvh h-full w-full bg-gray-100 flex items-center justify-center pt-24 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md overflow-y-auto">
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
          <div className="relative">
            <span className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500 select-none">
              +380
            </span>
            <input
              type="text"
              name="phone"
              placeholder="___ ___ ___"
              value={formData.phone}
              onChange={(e) => {
                let digitsOnly = e.target.value.replace(/\D/g, "");
                if (digitsOnly.startsWith("0")) {
                  digitsOnly = digitsOnly.slice(1);
                }
                digitsOnly = digitsOnly.slice(0, 9);
                setFormData({ ...formData, phone: digitsOnly });
              }}
              className="w-full pl-16 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
            />
          </div>
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Повторіть пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Nblue"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
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
