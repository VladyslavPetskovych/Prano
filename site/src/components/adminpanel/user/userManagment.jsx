import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get("https://prano.group/api/users", {
        headers: { Authorization: `${accessToken}` },
      })
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, [accessToken]);

  const makeAdmin = (userId) => {
    axios
      .post(
        `https://prano.group/api/users/set-admin/${userId}`,
        {},
        {
          headers: { Authorization: `${accessToken}` },
        }
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: "admin" } : user
          )
        );
      })
      .catch(() => {
        alert("Не вдалося змінити роль користувача");
      });
  };

  const deleteUser = (userId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити цього користувача?"))
      return;

    axios
      .delete(`https://prano.group/api/users/${userId}`, {
        headers: { Authorization: `${accessToken}` },
      })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      })
      .catch(() => {
        alert("Не вдалося видалити користувача");
      });
  };

  const banUser = (userId) => {
    if (
      !window.confirm("Ви впевнені, що хочете заблокувати цього користувача?")
    )
      return;

    axios
      .post(
        `https://prano.group/api/users/ban/${userId}`,
        {},
        {
          headers: { Authorization: `${accessToken}` },
        }
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, banned: true } : user
          )
        );
      })
      .catch(() => {
        alert("Не вдалося заблокувати користувача");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
        Управління користувачами
      </h2>
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Завантаження...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse min-w-max">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-sm md:text-base">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Ім'я</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Роль</th>
                <th className="p-3 border">Дії</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b text-sm md:text-base">
                  <td className="p-3 border break-words max-w-xs">
                    {user._id}
                  </td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border break-words max-w-xs">
                    {user.email}
                  </td>
                  <td className="p-3 border">{user.role}</td>
                  <td className="p-3 border flex flex-col md:flex-row gap-2">
                    {user.role !== "admin" && (
                      <button
                        className="py-1 px-3 bg-green-500 text-white rounded text-xs md:text-sm hover:bg-green-600"
                        onClick={() => makeAdmin(user._id)}
                      >
                        Адмін
                      </button>
                    )}
                    <button
                      className="py-1 px-3 bg-yellow-500 text-white rounded text-xs md:text-sm hover:bg-yellow-600"
                      onClick={() => banUser(user._id)}
                    >
                      Бан
                    </button>
                    <button
                      className="py-1 px-3 bg-red-500 text-white rounded text-xs md:text-sm hover:bg-red-600"
                      onClick={() => deleteUser(user._id)}
                    >
                      Видалити
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
