import React, { useState } from "react";
import CustomButton from "../components/utils/customButton";
import PostManagement from "../components/adminpanel/post/postManagment";
import PriceServiceManagment from "../components/adminpanel/priceService/priceServiceManagment";
import UserManagement from "../components/adminpanel/user/userManagment";
import AdvertManagement from "../components/adminpanel/advert/advertManagment";

const AdminPanel = () => {
  const [view, setView] = useState("posts");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-32">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Панель керування
        </h1>
        <div className="flex flex-col md:flex-row text-center items-center justify-center">
          <p className="text-red-500">
            Обережно, всі зміни тут, одразу з'являться на сайті!!!!
          </p>

          <CustomButton
            variant="link"
            onClick={() => (window.location.href = "/account")}
            className="text-blue-500 bg-slate-200"
          >
            Повернутись назад ↩️
          </CustomButton>
        </div>

        <div className="flex flex-col md:flex-row justify-center  m-8">
          <CustomButton
            onClick={() => setView("posts")}
            variant={view === "posts" ? "default" : "outline"}
            className="py-1 px-2 text-base m-1"
          >
            Редагувати блог
          </CustomButton>
          <CustomButton
            onClick={() => setView("prices")}
            variant={view === "prices" ? "default" : "outline"}
            className="py-1 px-2 text-base m-1"
          >
            Редагувати послуги і ціни 
          </CustomButton>
          <CustomButton
            onClick={() => setView("users")}
            variant={view === "users" ? "default" : "outline"}
            className="py-1 px-2 text-base m-1"
          >
            Управління користувачами
          </CustomButton>
          <CustomButton
            onClick={() => setView("adverts")}
            variant={view === "adverts" ? "default" : "outline"}
            className="py-1 px-2 text-base m-1"
          >
            Управління пропозиціями
          </CustomButton>
        </div>
        {view === "posts" && <PostManagement />}
        {view === "prices" && <PriceServiceManagment />}
        {view === "users" && <UserManagement />}
        {view === "adverts" && <AdvertManagement />}
      </div>
    </div>
  );
};

export default AdminPanel;
