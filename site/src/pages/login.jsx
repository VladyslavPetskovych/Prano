import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Для повідомлень
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Очищуємо повідомлення перед запитом

    try {
      const response = await axios.post("https://prano.group/api/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, userId } = response.data;

      if (userId) {
        dispatch(login({ accessToken, refreshToken, userId }));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);

        navigate("/account");
      } else {
        console.error("User ID is missing from the response.");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );

      if (error.response?.status === 403) {
        // Користувач не активований
        setErrorMessage(
          "Ваш акаунт не активовано. Перевірте пошту для активації."
        );
      } else if (error.response?.status === 404) {
        // Користувач не знайдений
        setErrorMessage(
          "Користувача не знайдено. Перевірте правильність email або зареєструйтесь."
        );
      } else {
        // Інші помилки
        setErrorMessage(
          error.response?.data?.message || "Помилка входу. Спробуйте ще раз."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10 min-h-[100dvh]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Увійти</h2>

        {errorMessage && (
          <p className="text-center text-red-500 font-medium mt-4">
            {errorMessage}
          </p>
        )}

        <form className="mt-6" onSubmit={handleLogin}>
          <input
            className="w-full p-3 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-center text-sm text-gray-700 mb-3">
            <span className="font-medium">Не зареєстровані?</span>
            <Link
              to="/register"
              className="text-blue-500 mx-2 hover:text-blue-700 font-medium"
            >
              Зареєструйтесь в 2 кліки
            </Link>
          </div>

          <div className="text-center text-sm text-gray-700 mb-6">
            <span className="font-medium">Забули пароль?</span>
            <Link
              to="/reset-password"
              className="text-blue-500 mx-2 hover:text-blue-700 font-medium"
            >
              Відновити доступ
            </Link>
          </div>

          <button
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            type="submit"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
