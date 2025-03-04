import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout, setUser } from "../redux/authSlice"; // Import setUser action
import OrderForm from "../components/account/orderForm";
import OrderHistory from "../components/account/orderHistory";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col pt-32 relative px-4">
      <button
        onClick={() => {
          logLocalStorageData();
          dispatch(logout());
        }}
        className="absolute top-28 right-12 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
      >
        Вийти
      </button>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 mt-9">
        Мій профіль
      </h2>
      <p className="text-center text-gray-600 mb-6">Профіль</p>

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

      <div className="flex flex-col-reverse md:flex-row justify-center items-start w-full max-w-6xl mx-auto gap-12">
        <div className="w-full md:w-2/5 lg:w-1/3">
          <OrderHistory />
        </div>

        <div className="w-full md:w-3/5 lg:w-2/3">
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default Account;
