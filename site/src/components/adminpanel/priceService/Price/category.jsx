import React, { useState } from "react";

const CategoryManager = ({
  categories,
  newCategory,
  setNewCategory,
  handleAddCategory,
  handleDeleteCategory,
  handleEditCategory,
  handleUpdateCategoryOrder,
  handleToggleCategoryVisibility,
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
        <span className="font-semibold">
          Керування категоріями (порядок блоків на сторінці «Ціни»)
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[2000px] mt-3" : "max-h-0"
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

          <p className="text-xs text-gray-600">
            Менше число — вище блок на сайті. Категорії без номера йдуть в кінці (як раніше за
            датою).
          </p>

          {/* Список категорій */}
          <ul className="space-y-1">
            {Object.values(categories)
              .sort((a, b) => {
                const ao = a.order != null ? a.order : Number.MAX_SAFE_INTEGER;
                const bo = b.order != null ? b.order : Number.MAX_SAFE_INTEGER;
                if (ao !== bo) return ao - bo;
                const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return at - bt;
              })
              .map((cat) => (
                <li
                  key={cat._id}
                  className="flex flex-wrap justify-between items-center border p-2 rounded gap-2"
                >
                  {editingId === cat._id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="border p-1 flex-1 min-w-[120px]"
                      />
                      <button
                        type="button"
                        onClick={saveEdit}
                        className="bg-blue-500 text-white px-2 rounded"
                      >
                        💾
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="bg-gray-400 text-white px-2 rounded"
                      >
                        ✖
                      </button>
                    </>
                  ) : (
                    <>
                      <label className="flex items-center gap-1 text-sm shrink-0">
                        <span className="text-gray-500 whitespace-nowrap">№</span>
                        <input
                          type="number"
                          min={0}
                          className="border p-1 w-16 rounded"
                          defaultValue={cat.order ?? ""}
                          key={`ord-${cat._id}-${cat.order ?? "x"}`}
                          onBlur={(e) => {
                            const raw = e.target.value.trim();
                            if (raw === "") return;
                            const v = parseInt(raw, 10);
                            if (!Number.isFinite(v) || v < 0) return;
                            if (v === cat.order) return;
                            handleUpdateCategoryOrder(cat._id, v);
                          }}
                          title="Порядок на сторінці цін (збережеться після виходу з поля)"
                        />
                      </label>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          cat.isActive === false
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {cat.isActive === false ? "Приховано" : "Показується"}
                      </span>
                      <span className="flex-1 min-w-[120px]">{cat.title}</span>
                      <button
                        type="button"
                        onClick={() =>
                          handleToggleCategoryVisibility(
                            cat._id,
                            !(cat.isActive !== false)
                          )
                        }
                        className={`text-white px-2 rounded ${
                          cat.isActive === false
                            ? "bg-emerald-600"
                            : "bg-slate-600"
                        }`}
                        title="Показувати або приховувати категорію на сторінці цін"
                      >
                        {cat.isActive === false ? "👁 Показати" : "🙈 Приховати"}
                      </button>
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
