import React, { useMemo, useState } from "react";
import PremiumInfoModal from "./PremiumInfoModal";
import { applyDiscount, isHomeTextileCategory } from "./discountRules";

export default function CategorySection({ title, description, items }) {
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" = A-Z, "desc" = Z-A

  const sortedItems = useMemo(() => {
    const list = Array.isArray(items) ? [...items] : [];
    return list.sort((a, b) => {
      const nameA = (a?.title ?? "").toLowerCase();
      const nameB = (b?.title ?? "").toLowerCase();
      const cmp = nameA.localeCompare(nameB, "uk");
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [items, sortOrder]);

  const toggleSort = () => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  // 🆕 Позначка "NEW" для "Чистка килимів"
  const isNewCategory = title === "Чистка килимів";

  // ✅ Бейдж -20%:
  // - для домашнього текстилю — завжди
  // - для інших категорій — тільки якщо реально є знижка в хоча б 1 позиції
  const isHomeTextile = isHomeTextileCategory(title);

  const hasAnyDiscount = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return false;

    return items.some((item) => {
      const itemTitle = item?.title ?? "";
      const std = item?.price;
      const pr = item?.secondPrice;

      const stdDiscount =
        std != null ? applyDiscount(std, itemTitle, title) : std;
      const prDiscount = pr != null ? applyDiscount(pr, itemTitle, title) : pr;

      return (
        (std != null && Number(stdDiscount) !== Number(std)) ||
        (pr != null && Number(prDiscount) !== Number(pr))
      );
    });
  }, [items, title]);

  // ✅ If you want to HIDE the badge when discounts are disabled:
  // const showBadge = false;
  const showBadge = !isNewCategory && (isHomeTextile || hasAnyDiscount);

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

        {/* {showBadge && (
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-xl bg-neutral-900 text-white border border-white/10 shadow-lg text-xs sm:text-sm font-semibold">
            −20% 🔥
          </div>
        )} */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-[13px] sm:text-base">
          <thead>
            <tr className="bg-Ngold/30 text-Nblack uppercase tracking-wider">
              <th
                className="px-4 sm:px-6 py-3 sm:py-4 text-left w-[45%] cursor-pointer select-none hover:bg-Ngold/50 transition-colors rounded-tl-lg"
                onClick={toggleSort}
                title={sortOrder === "asc" ? "Сортувати Z→A" : "Сортувати A→Z"}
              >
                Назва {sortOrder === "asc" ? "↑" : "↓"}
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
            {sortedItems.map((item, i) => {
              const {
                title: itemTitle,
                price: std,
                secondPrice: pr,
                quantity,
              } = item;

              // ✅ DISCOUNT LOGIC DISABLED (commented)
              // const stdDiscount =
              //   std != null ? applyDiscount(std, itemTitle, title) : std;
              // const prDiscount =
              //   pr != null ? applyDiscount(pr, itemTitle, title) : pr;
              // const stdHasDiscount =
              //   std != null && Number(stdDiscount) !== Number(std);
              // const prHasDiscount =
              //   pr != null && Number(prDiscount) !== Number(pr);

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

                  {/* Стандарт (no discount view) */}
                  <td className="px-1 sm:px-2 py-3 text-center border-l whitespace-nowrap font-medium">
                    {std ? `${std} грн` : ""}
                  </td>

                  {/* Преміум (no discount view) */}
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
