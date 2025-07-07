import React from "react";
import axios from "axios";

const UserRow = ({
  user,
  users,
  setUsers,
  accessToken,
  editingUser,
  setEditingUser,
  editForm,
  setEditForm,
}) => {
  const startEdit = () => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  };

  const saveChanges = async () => {
    try {
      if (editForm.name && editForm.name !== user.name) {
        await axios.patch(
          `https://prano.group/api/users/${user._id}`,
          { name: editForm.name },
          { headers: { Authorization: `${accessToken}` } }
        );
      }
      if (editForm.email && editForm.email !== user.email) {
        await axios.patch(
          `https://prano.group/api/users/${user._id}/email`,
          { email: editForm.email },
          { headers: { Authorization: `${accessToken}` } }
        );
      }
      if (editForm.phone && editForm.phone !== user.phone) {
        await axios.patch(
          `https://prano.group/api/users/${user._id}/phone`,
          { phone: editForm.phone },
          { headers: { Authorization: `${accessToken}` } }
        );
      }

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, name: editForm.name, email: editForm.email, phone: editForm.phone }
            : u
        )
      );
      setEditingUser(null);
    } catch (err) {
      if (err.response?.data?.message) {
        alert(`Помилка: ${err.response.data.message}`);
      } else {
        alert("Не вдалося зберегти зміни");
      }
    }
  };

  const makeAdmin = () => {
    axios
      .post(
        `https://prano.group/api/users/set-admin/${user._id}`,
        {},
        { headers: { Authorization: `${accessToken}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, role: "admin" } : u))
        );
      })
      .catch(() => alert("Не вдалося змінити роль"));
  };

  const deleteUser = () => {
    if (!window.confirm("Ви впевнені, що хочете видалити цього користувача?")) return;
    axios
      .delete(`https://prano.group/api/users/${user._id}`, {
        headers: { Authorization: `${accessToken}` },
      })
      .then(() => {
        setUsers((prev) => prev.filter((u) => u._id !== user._id));
      })
      .catch(() => alert("Не вдалося видалити користувача"));
  };

  const banUser = () => {
    if (!window.confirm("Ви впевнені, що хочете заблокувати цього користувача?")) return;
    axios
      .post(
        `https://prano.group/api/users/ban/${user._id}`,
        {},
        { headers: { Authorization: `${accessToken}` } }
      )
      .then(() => {
        setUsers((prev) =>
          prev.map((u) => (u._id === user._id ? { ...u, banned: true } : u))
        );
      })
      .catch(() => alert("Не вдалося заблокувати користувача"));
  };

  return (
    <tr className="border-b text-sm md:text-base">
      <td className="p-3 border break-words max-w-xs">{user._id}</td>
      <td className="p-3 border">
        {editingUser === user._id ? (
          <input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="border p-1 rounded w-full"
          />
        ) : (
          user.name
        )}
      </td>
      <td className="p-3 border break-words max-w-xs">
        {editingUser === user._id ? (
          <div className="flex flex-col gap-1">
            <input
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              placeholder="Email"
              className="border p-1 rounded"
            />
            <input
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              placeholder="Телефон"
              className="border p-1 rounded"
            />
          </div>
        ) : (
          <>
            {user.email}
            {user.phone && <div className="text-xs text-gray-500">{user.phone}</div>}
          </>
        )}
      </td>
      <td className="p-3 border">{user.role}</td>
      <td className="p-3 border flex flex-col md:flex-row gap-2">
        {editingUser === user._id ? (
          <>
            <button
              className="py-1 px-3 bg-blue-500 text-white rounded text-xs md:text-sm"
              onClick={saveChanges}
            >
              Зберегти
            </button>
            <button
              className="py-1 px-3 bg-gray-500 text-white rounded text-xs md:text-sm"
              onClick={() => setEditingUser(null)}
            >
              Скасувати
            </button>
          </>
        ) : (
          <>
            <button
              className="py-1 px-3 bg-indigo-500 text-white rounded text-xs md:text-sm hover:bg-indigo-600"
              onClick={startEdit}
            >
              Редагувати
            </button>
            {user.role !== "admin" && (
              <button
                className="py-1 px-3 bg-green-500 text-white rounded text-xs md:text-sm hover:bg-green-600"
                onClick={makeAdmin}
              >
                Адмін
              </button>
            )}
            <button
              className="py-1 px-3 bg-yellow-500 text-white rounded text-xs md:text-sm hover:bg-yellow-600"
              onClick={banUser}
            >
              Бан
            </button>
            <button
              className="py-1 px-3 bg-red-500 text-white rounded text-xs md:text-sm hover:bg-red-600"
              onClick={deleteUser}
            >
              Видалити
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
