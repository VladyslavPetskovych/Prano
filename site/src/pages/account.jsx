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
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-gray-200 flex flex-col pt-32 relative px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-row items-center justify-center">
          <img
            className="bg-slate-300 rounded-full h-10 mr-3"
            src={userpng}
            alt="alterimg"
          />
          <h2 className="text-xl font-bold text-center text-gray-800 ">
            {user?.name ? user.name : "Вітаємо, користувач!"}
          </h2>
        </div>

        <button
          onClick={() => {
            logLocalStorageData();
            dispatch(logout());
          }}
          className=" bg-red-500 text-white px-2 md:px-4 py-2 rounded-lg text-xs font-medium hover:bg-red-600 transition"
        >
          Вийти з профілю
        </button>
      </div>

      {user?.status === "inactive" && (
        <ReactivateButton userId={userId} accessToken={accessToken} />
      )}

      {user?.role === "admin" && (
        <div className="text-center mb-6">
          <Link
            to="/admin"
            className="block w-full max-w-xs mx-auto bg-blue-500 text-white px-6 py-3 rounded-lg text-lg sm:text-xl font-semibold hover:bg-blue-600 transition"
          >
            Перейти до панелі адміністратора
          </Link>
        </div>
      )}

      <TelegramAccaunt />
      <div className="flex flex-col-reverse md:flex-row justify-evenly items-start w-full mx-auto gap-6 mb-32">
        <OrderHistory />
        <OrderForm user={user} />
        <p></p>
        <p></p>
      </div>
    </div>
  );
};

export default Account;
