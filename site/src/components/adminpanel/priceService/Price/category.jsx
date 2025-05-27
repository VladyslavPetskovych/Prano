import React, { useState } from "react";

const CategoryManager = ({
  categories,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleDeleteCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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

          <ul className="space-y-1">
            {Object.values(categories).map((cat) => (
              <li
                key={cat._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{cat.title}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
