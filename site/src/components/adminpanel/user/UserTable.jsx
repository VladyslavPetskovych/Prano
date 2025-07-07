import React, { useState } from "react";
import UserRow from "./UserRow";

const UserTable = ({ users, setUsers, accessToken }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

  return (
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
          <UserRow
            key={user._id}
            user={user}
            users={users}
            setUsers={setUsers}
            accessToken={accessToken}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            editForm={editForm}
            setEditForm={setEditForm}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
