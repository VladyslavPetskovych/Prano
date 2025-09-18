// src/components/CategorySection.jsx
import React, { useState } from "react";
import PremiumInfoModal from "./PremiumInfoModal"; // підправ шлях, якщо інший

export default function CategorySection({ title, description, items }) {
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
  const [isDescOpen, setDescOpen] = useState(false); // для мобільного опису

  return (
    <div className="bg-white shadow-2xl rounded-3xl border border-Ngold/30 overflow-hidden transition-transform border-Ndark hover:shadow-2xl">
      {/* Заголовок групи + опис */}
      <div className="bg-Ngold py-5 px-8">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-3xl font-extrabold tracking-wide text-Nblack">
            {title}
          </h2>

          {/* Desktop/Tablet: бейдж у рядок */}
          {description && (
            <span className="hidden md:inline-flex text-sm font-normal text-Nblack/80 bg-white/30 rounded-lg px-3 mt-1.5 py-1">
              {description}
            </span>
          )}

          {/* Mobile: кнопка-стрілка для відкриття опису */}
          {description && (
            <button
              type="button"
              className="ml-auto md:hidden inline-flex items-center gap-1 text-Nblack/80 hover:text-Nblack transition"
              aria-label="Показати опис"
              aria-expanded={isDescOpen}
              onClick={() => setDescOpen((v) => !v)}
            >
              <span className="text-sm font-medium">Деталі</span>
              <svg
                className={`h-4 w-4 transition-transform ${
                  isDescOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile: випадаюча панель опису */}
        {description && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isDescOpen ? "max-h-40 mt-3" : "max-h-0"
            }`}
          >
            <div className="text-sm font-normal text-Nblack/80 bg-white/40 rounded-lg px-3 py-2">
              {description}
            </div>
          </div>
        )}
      </div>

      {/* Таблиця */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-Ngold/30 text-Nblack uppercase tracking-wider">
              <th className="px-6 py-4 text-left w-1/2">Назва </th>
              <th className="px-6 py-4 text-center w-1/8 hidden md:block"></th>
              <th className="px-6 py-4 text-center w-1/6">Ціна "Стандарт"</th>
              <th className="px-6 py-4 w-1/6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                  <span>Ціна "Преміум"</span>
                  <button
                    onClick={() => setPremiumModalOpen(true)}
                    className="text-Nblack text-lg ml-1 hover:text-Ngold transition-colors"
                    title="Що таке Ціна Преміум?"
                  >
                    (?)
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="text-left font-manrope text-gray-700">
            {items.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0
                    ? "bg-white hover:bg-Ngold/20"
                    : "bg-Ngold/30 hover:bg-Ngold/20"
                } transition-colors duration-300`}
              >
                <td className="px-4 py-3 text-sm whitespace-normal break-words max-w-[140px] sm:max-w-none sm:text-base">
                  {item.title}
                </td>
                <td className="px-2 py-4 text-center text-sm border-l border-gray-300 hidden md:table-cell">
                  {item.quantity || "шт."}
                </td>
                <td className="px-2 py-4 text-center text-sm border-l border-gray-300">
                  {item.price}
                </td>
                <td className="px-2 py-4 text-center text-sm border-l border-gray-300">
                  {item.secondPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <PremiumInfoModal
          isOpen={isPremiumModalOpen}
          onClose={() => setPremiumModalOpen(false)}
        />
      </div>
    </div>
  );
}
