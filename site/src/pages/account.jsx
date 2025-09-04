import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, setUser } from "../redux/authSlice";
import OrderForm from "../components/account/orderForm";
import OrderHistory from "../components/account/orderHistory/orderHistory";
import axios from "axios";
import ReactivateButton from "../components/login/reactivateButton";
import TelegramAccaunt from "../components/account/telegramAccaunt";
import AccountHeader from "../components/account/AccountHeader";
import api from "../api/api.js";

const logLocalStorageData = () => {
  console.log("🔹 Stored Data in LocalStorage:");
  console.log("📌 Access Token:", localStorage.getItem("accessToken"));
  console.log("📌 Refresh Token:", localStorage.getItem("refreshToken"));
  console.log("📌 UserId:", localStorage.getItem("userId"));
};

const fetchUserData = async (userId, accessToken, dispatch) => {
  try {
    const response = await api.get(
      `https://prano.group/api/users/${userId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    console.log("Fetched User Data:", response.data);

    // зберігаємо користувача в Redux
    dispatch(setUser(response.data));
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const Account = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    logLocalStorageData();

    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUserId = localStorage.getItem("userId");

    // якщо Redux пустий, але є токени у localStorage → відновлюємо сесію через login
    if (!accessToken && storedAccessToken && storedUserId) {
      dispatch(
        login({
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
          userId: storedUserId,
          user: null,
        })
      );
    }

    // завантажуємо дані користувача
    if (storedUserId && storedAccessToken) {
      fetchUserData(storedUserId, storedAccessToken, dispatch).finally(() => {
        setCheckingAuth(false);
      });
    } else {
      setCheckingAuth(false);
    }
  }, [accessToken, userId, dispatch]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Перевірка авторизації...</p>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 pt-32 px-4 font-tinos text-gray-800 relative overflow-x-hidden">
      {/* 🔹 Хедер */}
      <AccountHeader user={user} />

      {/* 🔹 Сповіщення про статус */}
      {user?.status === "inactive" && (
        <div className="mb-8">
          <ReactivateButton userId={userId} accessToken={accessToken} />
        </div>
      )}

      {/* 🔹 Telegram */}
      <div className="mb-10 max-w-4xl mx-auto">
        <TelegramAccaunt />
      </div>

      {/* 🔹 Основна частина */}
      <div className="max-w-4xl mx-auto mb-10 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all">
        <OrderForm user={user} />
      </div>

      {/* 🔹 Історія замовлень */}
      <div className="max-w-4xl mx-auto mb-20">
        <button
          onClick={() => setIsHistoryOpen(!isHistoryOpen)}
          className="block w-full text-center bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition"
        >
          {isHistoryOpen
            ? "Сховати попередні замовлення"
            : "Показати попередні замовлення"}
        </button>

        {/* <div
          className={`transition-all duration-500 overflow-hidden ${
            isHistoryOpen ? "max-h-[2000px] mt-6" : "max-h-0"
          }`}
        >
          <div className="mt-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg">
            <OrderHistory />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Account;
