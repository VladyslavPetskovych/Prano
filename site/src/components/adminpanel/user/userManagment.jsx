import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    // лог того, що відправляємо
    console.groupCollapsed("🛰️ GET https://prano.group/api/users (request)");
    console.log("headers.Authorization:", `${accessToken}`);
    console.groupEnd();

    axios
      .get("https://prano.group/api/users", {
        headers: { Authorization: `${accessToken}` },
      })
      .then((response) => {
        // детальний лог відповіді
        console.groupCollapsed("📦 GET /api/users (response)");
        console.log("status:", response.status, response.statusText);
        console.log("headers:", response.headers);
        console.log("data (raw):", response.data);
        console.log("data.data (users?):", response.data?.data);
        console.groupEnd();

        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        // детальний лог помилки
        console.groupCollapsed("❌ GET /api/users (error)");
        console.log("message:", err?.message);
        console.log("status:", err?.response?.status);
        console.log("data:", err?.response?.data);
        console.log("config:", err?.config);
        console.groupEnd();

        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, [accessToken]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Управління користувачами
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Завантаження...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <UserTable
            users={users}
            setUsers={setUsers}
            accessToken={accessToken}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
