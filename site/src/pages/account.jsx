import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import OrderForm from "../components/account/orderForm";
import OrderHistory from "../components/account/orderHistory";

const Account = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 flex flex-col pt-32 relative px-4">

      <button
        onClick={() => dispatch(logout())}
        className="absolute top-28 right-12 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
      >
        Вийти
      </button>

      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 mt-9">
        Мій профіль
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Залиште своє замовлення і менеджер зв'яжеться з Вами <span className="font-semibold">{user?.email}</span>
      </p>

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
