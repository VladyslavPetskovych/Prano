import React, { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://prano.group/api/users")
      .then((response) => {
        setUsers(response.data.data); // Accessing the 'data' field from the response
        setLoading(false);
      })
      .catch((err) => {
        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Управління користувачами
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-center text-gray-600">Завантаження...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Ім'я</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Дії</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3 border">{user._id}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">
                    <button className="py-1 px-3 bg-blue-500 text-white rounded">
                    ✍️
                    </button>
                    <button className="py-1 px-3 bg-red-500 text-white rounded ml-2">
                    🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
