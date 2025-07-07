import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Link } from "react-router-dom";
import userpng from "../../assets/account/userpng.png";

const logLocalStorageData = () => {
  console.log("🔹 Stored Data in LocalStorage:");
  console.log("📌 Access Token:", localStorage.getItem("accessToken"));
  console.log("📌 Refresh Token:", localStorage.getItem("refreshToken"));
  console.log("📌 UserId:", localStorage.getItem("userId"));
};

const AccountHeader = ({ user }) => {
  const dispatch = useDispatch();

  return (
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

      <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-Nblue hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition text-center"
          >
            Панель адміністратора
          </Link>
        )}

        <button
          onClick={() => {
            logLocalStorageData();
            dispatch(logout());
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
        >
          Вийти
        </button>
      </div>
    </div>
  );
};

export default AccountHeader;
