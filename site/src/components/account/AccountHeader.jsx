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
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-pureWhite border border-lightGray rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-4 text-center md:text-left">
        <img
          className="w-14 h-14 rounded-full bg-lightGray object-cover ring-2 ring-Ngold/50 ring-offset-2 ring-offset-pureWhite"
          src={userpng}
          alt="user"
        />
        <div>
          <p className="font-manrope text-xs uppercase tracking-wider text-coolBlue mb-0.5">
            Особистий кабінет
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-Ndark">
            {user?.name ? `Вітаємо, ${user.name}!` : "Вітаємо, користувач!"}
          </h2>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-Nblue hover:bg-Nblue/90 text-pureWhite px-4 py-2.5 rounded-xl text-sm font-manrope font-semibold text-center transition shadow-sm"
          >
            Панель адміністратора
          </Link>
        )}

        <button
          type="button"
          onClick={() => {
            logLocalStorageData();
            dispatch(logout());
          }}
          className="border border-lightGray text-logoGray hover:bg-lightGray/50 px-4 py-2.5 rounded-xl text-sm font-manrope font-semibold transition"
        >
          Вийти
        </button>
      </div>
    </div>
  );
};

export default AccountHeader;
