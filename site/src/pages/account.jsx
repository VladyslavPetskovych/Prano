import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout, setUser } from "../redux/authSlice";
import OrderForm from "../components/account/orderForm";
import OrderHistory from "../components/account/orderHistory/orderHistory";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactivateButton from "../components/login/reactivateButton";
import TelegramAccaunt from "../components/account/telegramAccaunt";
import userpng from "../assets/account/userpng.png";

const logLocalStorageData = () => {
  console.log("🔹 Stored Data in LocalStorage:");
  console.log("📌 Access Token:", localStorage.getItem("accessToken"));
  console.log("📌 Refresh Token:", localStorage.getItem("refreshToken"));
  console.log("📌 UserId:", localStorage.getItem("userId"));
};

const fetchUserData = async (userId, accessToken, dispatch) => {
  try {
    const response = await axios.get(
      `https://prano.group/api/users/${userId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
        },
      }
    );

    console.log("Fetched User Data:", response.data);

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

  useEffect(() => {
    logLocalStorageData();

    const storedAccessToken = localStorage.getItem("accessToken");
    const storedUserId = localStorage.getItem("userId");

    if (!accessToken && storedAccessToken) {
      dispatch(
        setUser({ accessToken: storedAccessToken, userId: storedUserId })
      );
    }

    if (userId && accessToken) {
      fetchUserData(userId, accessToken, dispatch);
    }
  }, [accessToken, userId, dispatch]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 pt-32 px-4 font-tinos text-gray-800 relative overflow-x-hidden">
      {/* ХЕДЕР — залишено без змін */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-12">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full bg-slate-300"
            src={userpng}
            alt="user"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.name ? `Вітаємо, ${user.name}!` : "Вітаємо, користувач!"}
          </h2>
        </div>

        <button
          onClick={() => {
            logLocalStorageData();
            dispatch(logout());
          }}
          className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-semibold transition"
        >
          Вийти з профілю
        </button>
      </div>

      {/* 🔹 Сповіщення про статус */}
      {user?.status === "inactive" && (
        <div className="mb-8">
          <ReactivateButton userId={userId} accessToken={accessToken} />
        </div>
      )}

      {/* 🔹 Кнопка для адміна */}
      {user?.role === "admin" && (
        <div className="text-center mb-6">
          <Link
            to="/admin"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow transition"
          >
            Панель адміністратора
          </Link>
        </div>
      )}

      {/* 🔹 Telegram */}
      <div className="mb-10 max-w-4xl mx-auto">
        <TelegramAccaunt />
      </div>

      {/* 🔹 Основна частина — Історія та форма */}
      <div className="flex flex-col-reverse lg:flex-row gap-12 justify-between items-start max-w-6xl mx-auto mb-20">
        <div className="w-full lg:w-1/2 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all">
          <OrderHistory />
        </div>
        <div className="w-full lg:w-1/2 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg transition-all">
          <OrderForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default Account;
