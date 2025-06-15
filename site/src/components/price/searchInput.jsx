import React, { useState } from "react";
import glass from "../../assets/utils/glass.png";

function SearchInput({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTerm(value);
    if (onSearch) {
      onSearch(value); // викликається при кожному введенні
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-6">
      <p className="text-black text-center text-lg md:text-xl font-bold tracking-wide">
        Пошук
      </p>

      <div className="relative w-full md:w-[260px]">
        <input
          type="text"
          placeholder="Введіть назву одягу"
          className="w-full px-4 py-2 pr-12 border border-gray-600 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={term}
          onChange={handleChange}
        />
        <button
          onClick={() => onSearch(term)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 w-9 h-9 flex justify-center items-center rounded-full hover:bg-gray-200 transition"
        >
          <img src={glass} alt="search" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default SearchInput;
