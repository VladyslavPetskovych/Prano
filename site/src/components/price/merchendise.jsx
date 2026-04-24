import React, { useMemo, useState } from "react";
import { useMerchandiseData } from "./useMerchandiseData";
import { useProducts } from "./useProducts";
import { buildMatchedDescriptions } from "./descriptionMatcher";
import { getPriceCategoryPatternIndex } from "./categoryDisplayOrder";
import PricesHeader from "./PricesHeader";
import pricePromoImage from "../../assets/price/prom24042026.jpg";

export default function Merchandise() {
  const { categories, groupedData, loading, error, fetchData } =
    useMerchandiseData();
  const { products, prodLoading, prodError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
    fetchData(term);
  };

  // Опис для кожної категорії (key: categoryId)
  const matchedDescriptions = useMemo(
    () => buildMatchedDescriptions(categories, products, 0.45),
    [categories, products]
  );

  const sortedCategoryEntries = useMemo(() => {
    const entries = Object.entries(groupedData);

    /** Порядок блоків цін — поле order з колекції categories (адмінка → категорії). */
    const effectiveOrder = (group) => {
      if (group.order != null && group.order !== "") {
        const n = Number(group.order);
        return Number.isFinite(n) ? n : null;
      }
      return null;
    };

    return [...entries].sort((a, b) => {
      const [, gA] = a;
      const [, gB] = b;
      const oA = effectiveOrder(gA);
      const oB = effectiveOrder(gB);
      const rankA = oA == null ? Number.MAX_SAFE_INTEGER : oA;
      const rankB = oB == null ? Number.MAX_SAFE_INTEGER : oB;
      if (rankA !== rankB) return rankA - rankB;

      const iA = getPriceCategoryPatternIndex(gA.title);
      const iB = getPriceCategoryPatternIndex(gB.title);
      if (iA !== iB) return iA - iB;
      return String(gA.title || "").localeCompare(String(gB.title || ""), "uk");
    });
  }, [groupedData]);

  return (
    <div className="py-1 mt-1 space-y-6 font-manrope font-bold max-w-8xl mx-auto">
      <div className="w-full flex justify-center pt-16">
        <div className="w-[60vw] min-w-[300px] max-w-[760px] overflow-hidden rounded-2xl border border-Ngold/30 shadow-md bg-white">
          <img
            src={pricePromoImage}
            alt="Промо хімчистки"
            className="w-full h-auto object-contain object-center"
            loading="lazy"
          />
        </div>
      </div>

      {/* Хедер «Ціни» + логотип + пошук */}
      <PricesHeader onSearch={handleSearch} />

      {/* Стан завантаження/помилок */}
      {error && <p className="text-center text-red-500">{error}</p>}
      {loading && (
        <p className="text-center text-gray-500">Завантаження цін…</p>
      )}
      {prodError && <p className="text-center text-red-500">{prodError}</p>}
      {prodLoading && (
        <p className="text-center text-gray-500">Завантаження описів…</p>
      )}

      {/* Категорії */}
      {sortedCategoryEntries.map(([categoryId, group]) => (
        <CategorySection
          key={categoryId}
          title={group.title}
          description={matchedDescriptions[categoryId]}
          items={group.items}
        />
      ))}

      {/* Банер */}
      <div className="max-w-3xl mx-auto text-center bg-white border border-Ngold/30 p-6 rounded-xl shadow-lg">
        <h1 className="text-lg sm:text-xl font-semibold text-Nblack tracking-wide leading-relaxed">
          При корпоративних замовленнях і великих об'ємах економія до{" "}
          <span className="font-extrabold">30%</span>
        </h1>
      </div>
    </div>
  );
}

// Локальний імпорт у кінці, щоб уникнути циклічних імпортів
import CategorySection from "./CategorySection";
