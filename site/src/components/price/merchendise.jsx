import React, { useMemo, useState } from "react";
import { useMerchandiseData } from "./useMerchandiseData";
import { useProducts } from "./useProducts";
import { buildMatchedDescriptions } from "./descriptionMatcher";
import PricesHeader from "./PricesHeader";

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

  return (
    <div className="py-4 mt-1 space-y-8 font-manrope font-bold max-w-8xl mx-auto">
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
      {Object.entries(groupedData).map(([categoryId, group]) => (
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
