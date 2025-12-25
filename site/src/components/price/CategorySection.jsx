import React, { useState } from "react";
import PremiumInfoModal from "./PremiumInfoModal";
// import { applyDiscount, getCategoryDiscount } from "./discountRules"; // 1. Commented out discount rules

export default function CategorySection({ title, description, items }) {
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);

  // 2. Commented out category discount logic
  // const categoryDiscount = getCategoryDiscount(title);

  // 🆕 Позначка "NEW" для "Чистка килимів"
  const isNewCategory = title === "Чистка килимів";

  return (
    <div className="bg-white shadow-2xl rounded-3xl border border-Ngold/30 overflow-hidden border-Ndark hover:shadow-2xl">
      <div className="bg-Ngold py-5 px-4 sm:px-8 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-Nblack flex items-center gap-2">
            {title}
            {isNewCategory && (
              <span className="bg-red-600 mt-1 text-white text-xs font-bold px-2 py-0.5 rounded-lg shadow-md">
                НОВИНКА
              </span>
            )}
          </h2>

          {description && (
            <p className="hidden md:inline-flex text-sm font-normal text-Nblack/80 bg-white/30 rounded-lg px-3 mt-1.5 py-1">
              {description}
            </p>
          )}
        </div>

        {/* 3. Commented out the discount badge in the header */}
        {/* {categoryDiscount > 0 && !isNewCategory && (
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-xl bg-neutral-900 text-white border border-white/10 shadow-lg text-xs sm:text-sm font-semibold">
            −{categoryDiscount}% 🔥
          </div>
        )} */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-[13px] sm:text-base">
          <thead>
            <tr className="bg-Ngold/30 text-Nblack uppercase tracking-wider">
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left w-[45%]">
                Назва
              </th>
              <th className="px-2 py-3 sm:py-4 text-center w-[12%]">
                Од. виміру
              </th>
              <th className="px-1 sm:px-3 py-3 sm:py-4 text-center w-[10%]">
                Стандарт
              </th>
              <th className="px-1 sm:px-3 py-3 sm:py-4 text-center w-[10%]">
                Преміум
              </th>
            </tr>
          </thead>

          <tbody className="text-left font-manrope text-gray-700">
            {(items ?? []).map((item, i) => {
              const {
                title: itemTitle,
                price: std,
                secondPrice: pr,
                quantity,
              } = item;

              // 4. Commented out discount application logic
              /* const stdDiscount = applyDiscount(std, itemTitle, title);
              const prDiscount = applyDiscount(pr, itemTitle, title);
              */

              return (
                <tr
                  key={item._id ?? `${itemTitle}-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-Ngold/20"}
                >
                  {/* Назва */}
                  <td className="px-4 sm:px-5 py-3 text-sm sm:text-base">
                    {itemTitle}
                  </td>

                  {/* Од. виміру */}
                  <td className="px-2 py-3 text-center text-sm sm:text-base border-l whitespace-nowrap">
                    {quantity || " "}
                  </td>

                  {/* Стандарт - Simplified to show only the base price */}
                  <td className="px-1 sm:px-2 py-3 text-center border-l whitespace-nowrap font-medium">
                    {std ? `${std} грн` : ""}
                  </td>

                  {/* Преміум - Simplified to show only the base price */}
                  <td className="px-1 sm:px-2 py-3 text-center border-l whitespace-nowrap font-medium">
                    {pr ? `${pr} грн` : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <PremiumInfoModal
        isOpen={isPremiumModalOpen}
        onClose={() => setPremiumModalOpen(false)}
      />
    </div>
  );
}
