import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://prano.group/api/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      // Save token & user data in Redux
      dispatch(login({ token, user }));

      // Save in localStorage to persist login
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to account page
      navigate("/account");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex pt-32 min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Увійти</h2>
        <form className="mt-4" onSubmit={handleLogin}>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center my-4 text-gray-700">
            <span className="font-medium">Не зареєстровані?</span>
            <Link
              to="/register"
              className="text-blue-500 mx-3 hover:text-blue-700 font-medium"
            >
              Зареєструйтесь в 2 кліки
            </Link>
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded">
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
