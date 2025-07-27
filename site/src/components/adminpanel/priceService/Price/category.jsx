import React, { useState } from "react";

const CategoryManager = ({
  categories,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleDeleteCategory,
  handleEditCategory, // ✅ нова функція
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const startEditing = (cat) => {
    setEditingId(cat._id);
    setEditTitle(cat.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = () => {
    if (editTitle.trim().length < 2) return;
    handleEditCategory(editingId, editTitle.trim());
    cancelEditing();
  };

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="text-left w-full bg-gray-100 p-2 rounded shadow flex justify-between items-center"
      >
        <span className="font-semibold">Керування категоріями</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[500px] mt-3" : "max-h-0"
        }`}
      >
        <div className="space-y-2">
          {/* Додавання нової */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Нова категорія"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border p-2 flex-1"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-green-500 text-white px-4 rounded"
            >
              Додати
            </button>
          </div>

          {/* Список категорій */}
          <ul className="space-y-1">
            {Object.values(categories).map((cat) => (
              <li
                key={cat._id}
                className="flex justify-between items-center border p-2 rounded gap-2"
              >
                {editingId === cat._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="border p-1 flex-1"
                    />
                    <button
                      onClick={saveEdit}
                      className="bg-blue-500 text-white px-2 rounded"
                    >
                      💾
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-2 rounded"
                    >
                      ✖
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{cat.title}</span>
                    <button
                      type="button"
                      onClick={() => startEditing(cat)}
                      className="bg-yellow-500 text-white px-2 rounded"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
