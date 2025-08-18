// src/components/prices/PricesHeader.jsx
import React from "react";
import SearchInput from "./searchInput";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

export default function PricesHeader({
  onSearch,
  title = "Ціни",
  showSearch = true,
}) {
  return (
    <div className="w-full pt-10 px-4 sm:px-20">
      <div className="rounded-3xl px-4 sm:px-8 py-2">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
  
          {showSearch && (
            <div className="w-full md:max-w-lg">
              <SearchInput onSearch={onSearch} />
            </div>
          )}

          {/* Праворуч: заголовок + логотип */}
          <div className="w-full md:w-auto flex flex-col items-center md:flex-row md:items-center md:justify-end gap-3 sm:gap-4">
            {/* Для телефонів: тільки текст по центру */}
            <h2 className="block md:hidden text-3xl font-extrabold text-Nblack leading-tight text-center">
              {title}
            </h2>

            {/* Для десктопів: текст + логотип праворуч */}
            <div className="hidden md:flex items-center gap-3 sm:gap-4 md:text-right md:justify-end">
              <div className="flex flex-col items-end">
                <h2 className="text-[34px] font-extrabold text-Nblack leading-tight">
                  {title}
                </h2>
                <span className="mt-2 h-1 w-24 bg-Ngold rounded-full md:ml-auto" />
              </div>
              <img
                src={CatLogo}
                alt="Cat logo"
                className="w-14 h-14 md:w-32 md:h-32 select-none"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
