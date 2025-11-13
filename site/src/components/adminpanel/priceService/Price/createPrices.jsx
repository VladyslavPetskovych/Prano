import React, { useState } from "react";
import useCategoryManager from "./useCategoryManager";
import useMerchandiseForm from "./useMerchandiseForm";
import CategoryM from "./category";

const CreatePrice = ({ refreshServices }) => {
  const {
    title,
    setTitle,
    price,
    setPrice,
    secondPrice,
    setSecondPrice,
    category,
    setCategory,
    newCategory,
    setNewCategory,
    loading,
    error,
    handleSubmit,
  } = useMerchandiseForm(refreshServices);

  const [order, setOrder] = useState("");
  const [quantity, setQuantity] = useState("");

  const {
    categories,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory, // ✅ додано
  } = useCategoryManager(newCategory, setNewCategory);

  return (
    <div className="bg-slate-200 min-h-[30vh] flex items-center justify-center p-3">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-4 text-center">Створити товар</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* ✅ Категорії: додано handleEditCategory */}
        <CategoryM
          categories={categories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
          handleDeleteCategory={handleDeleteCategory}
          handleEditCategory={handleEditCategory} // ✅ тепер працює редагування
        />

        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              title,
              price,
              secondPrice,
              category,
              order,
              quantity
            )
          }
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Ціна"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Друга ціна"
            value={secondPrice}
            onChange={(e) => setSecondPrice(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="number"
            placeholder="Порядок (необов'язково)"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            placeholder="Одиниця виміру (наприклад: кг, шт)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 w-full"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Оберіть категорію</option>
            {Object.values(categories).map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 w-full text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Створюється..." : "Додати товар"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePrice;
