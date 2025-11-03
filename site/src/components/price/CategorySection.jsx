import React, { useState } from "react";
import PremiumInfoModal from "./PremiumInfoModal";

// ✅ слова, при яких знижка не діє
const blockedWords = ["шкіра", "шкіря", "хутро", "хутря", "шуб"];

// ✅ перевірка назви
const isLeatherOrFur = (title = "") => {
  const t = title.toLowerCase();
  return blockedWords.some((word) => t.includes(word));
};

// ✅ застосування знижки
const applyDiscount = (price, title, discountPercent) => {
  const n = Number(price);
  if (!discountPercent || Number.isNaN(n) || isLeatherOrFur(title))
    return price;
  return Math.round(n - n * (discountPercent / 100));
};

export default function CategorySection({
  title,
  description,
  items,
  discountPercent = 0,
}) {
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);
  const [isDescOpen, setDescOpen] = useState(false);

  return (
    <div className="bg-white shadow-2xl rounded-3xl border border-Ngold/30 overflow-hidden transition-transform border-Ndark hover:shadow-2xl">
      <div className="bg-Ngold py-5 px-4 sm:px-8 flex justify-between items-center flex-wrap gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-Nblack">
            {title}
          </h2>
          {description && (
            <p className="hidden md:inline-flex text-sm font-normal text-Nblack/80 bg-white/30 rounded-lg px-3 mt-1.5 py-1">
              {description}
            </p>
          )}
        </div>

        {/* 🔥 Бейдж знижки (поки що без таймера) */}
        {discountPercent > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-xl bg-neutral-900 text-white border border-white/10 shadow-lg text-xs sm:text-sm font-semibold">
            −{discountPercent}% 🔥
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse text-[13px] sm:text-base">
          <thead>
            <tr className="bg-Ngold/30 text-Nblack uppercase tracking-wider">
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left w-2/3">
                Назва
              </th>
              <th className="px-1 sm:px-3 py-3 sm:py-4 text-center w-[8%] md:w-[10%]">
                Стандарт
              </th>
              <th className="px-1 sm:px-3 py-3 sm:py-4 text-center w-[8%] md:w-[10%]">
                Преміум
              </th>
            </tr>
          </thead>

          <tbody className="text-left font-manrope text-gray-700">
            {(items ?? []).map((item, i) => {
              const std = item.price;
              const pr = item.secondPrice;

              const stdDiscount = applyDiscount(
                std,
                item.title,
                discountPercent
              );
              const prDiscount = applyDiscount(pr, item.title, discountPercent);

              const noDiscount = isLeatherOrFur(item.title);

              return (
                <tr
                  key={item._id ?? `${item.title}-${i}`}
                  className={i % 2 === 0 ? "bg-white" : "bg-Ngold/20"}
                >
                  <td className="px-4 sm:px-5 py-3 text-sm sm:text-base">
                    {item.title}
                    {noDiscount && (
                      <span className="ml-1 text-[10px] sm:text-xs text-red-500 font-semibold">
                        (без знижки)
                      </span>
                    )}
                  </td>

                  {/* ✅ Стандарт */}
                  <td className="px-1 sm:px-2 py-3 text-center border-l whitespace-nowrap">
                    {std !== undefined && std !== "" ? (
                      !discountPercent || noDiscount ? (
                        `${std} грн`
                      ) : (
                        <div className="flex flex-col items-center text-red-600 font-bold">
                          <span className="line-through text-gray-500 text-[11px] sm:text-sm">
                            {std} грн
                          </span>
                          <span>{stdDiscount} грн</span>
                        </div>
                      )
                    ) : (
                      ""
                    )}
                  </td>

                  {/* ✅ Преміум */}
                  <td className="px-1 sm:px-2 py-3 text-center border-l whitespace-nowrap">
                    {pr !== undefined && pr !== "" ? (
                      !discountPercent || noDiscount ? (
                        `${pr} грн`
                      ) : (
                        <div className="flex flex-col items-center text-red-600 font-bold">
                          <span className="line-through text-gray-500 text-[11px] sm:text-sm">
                            {pr} грн
                          </span>
                          <span>{prDiscount} грн</span>
                        </div>
                      )
                    ) : (
                      ""
                    )}
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
