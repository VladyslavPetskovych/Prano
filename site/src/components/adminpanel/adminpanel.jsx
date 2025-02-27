import React, { useState } from "react";
import CustomButton from "../utils/customButton";
import PostManagement from "./postManagment";

const AdminPanel = () => {
  const [view, setView] = useState("posts");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-32">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Панель керування
        </h1>
        <p className="text-red-500">
          обережно всі зміни тут одразу з'являться на сайті!!!!
        </p>
        <div className="mt-8 text-center">
          <CustomButton
            variant="link"
            onClick={() => (window.location.href = "/account")}
            className="text-blue-500"
          >
            повернутись назад
          </CustomButton>
        </div>
        <div className="flex justify-center space-x-6 m-8">
          <CustomButton
            onClick={() => setView("posts")}
            variant={view === "posts" ? "default" : "outline"}
            className="py-2 px-4 text-lg"
          >
            Редагувати блог
          </CustomButton>
          <CustomButton
            onClick={() => setView("prices")}
            variant={view === "prices" ? "default" : "outline"}
            className="py-2 px-4 text-lg"
          >
            Редагувати ціни
          </CustomButton>
        </div>

        {view === "posts" && <PostManagement />}
        {view === "prices" && (
          <div className="text-center text-xl text-gray-700">
            Price Management Section
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
