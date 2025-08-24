import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";
import Pagination from "../pagination";

const PAGE_SIZE = 10; // скільки показуємо на сторінці

const UserManagement = () => {
  const accessToken = useSelector((s) => s.auth.accessToken);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [users, setUsers] = useState([]);

  // якщо плануєш пошук/сортування – просто заповни ці стани
  const [query, setQuery] = useState({}); // напр., { email: "test@site.com" }
  const [sortedBy, setSortedBy] = useState(undefined); // напр., "name" або "-name"

  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit: PAGE_SIZE,
        ...(sortedBy ? { sortedBy } : {}),
        ...query, // будь-які ключі для пошуку: email, name, тощо
      };

      // ЛОГИ (опційно)
      console.groupCollapsed("🛰️ GET https://prano.group/api/users");
      console.log(
        "Authorization:",
        accessToken ? accessToken.slice(0, 12) + "..." : ""
      );
      console.log("params:", params);
      console.groupEnd();

      const res = await axios.get("https://prano.group/api/users", {
        headers: { Authorization: accessToken }, // БЕЗ Bearer
        params,
      });

      const { data, page: respPage, perPage, itemsFound } = res.data || {};

      if (!Array.isArray(data))
        throw new Error("Невірний формат відповіді API");

      setUsers(data);

      // totalPages = стеля(itemsFound / perPage). якщо бек не віддасть – гарантуємо хоча б 1
      const tp = Math.max(
        1,
        Math.ceil((Number(itemsFound) || 0) / (Number(perPage) || PAGE_SIZE)) ||
          1
      );
      setTotalPages(tp);

      // якщо ми випадково опинилися за межами (напр., змінилася вибірка після пошуку)
      if (respPage && tp && respPage > tp) setCurrentPage(tp);
    } catch (err) {
      console.groupCollapsed("❌ /api/users error");
      console.log("message:", err?.message);
      console.log("status:", err?.response?.status);
      console.log("data:", err?.response?.data);
      console.groupEnd();
      setError("Помилка завантаження даних");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, currentPage, sortedBy, JSON.stringify(query)]);

  const handlePageChange = (p) => {
    const next = Math.max(1, Math.min(Number(p) || 1, totalPages));
    setCurrentPage(next);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Управління користувачами
      </h2>

      {/* приклад простих контролів пошуку/сорту (опційно) */}
      <div className="mb-4 flex gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="Пошук за email"
          onChange={(e) => setQuery((q) => ({ ...q, email: e.target.value || undefined }))}
        />
        <select
          className="border rounded px-3 py-2"
          onChange={(e) => setSortedBy(e.target.value || undefined)}
          defaultValue=""
        >
          <option value="">Сортувати…</option>
          <option value="name">Ім'я ↑</option>
          <option value="-name">Ім'я ↓</option>
          <option value="createdAt">Зареєстрований (дата) ↑</option>
          <option value="-createdAt">Зареєстрований (дата) ↓</option>
        </select>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Завантаження...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            <UserTable
              users={users}
              setUsers={setUsers}
              accessToken={accessToken}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <div className="mt-3 text-center text-xs text-gray-500">
              <span className="px-2 py-1 rounded bg-gray-100">
                Серверна пагінація • {PAGE_SIZE}/стор.
              </span>
              <span className="ml-2">•</span>
              <span className="ml-2">
                Сторінка: {currentPage} з {totalPages}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
