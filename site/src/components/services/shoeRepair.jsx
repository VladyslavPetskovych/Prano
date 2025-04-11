import React from "react";
import shoeRepairr from "../../assets/service/shoeRepair.jpg";

function ShoeRepair() {
  return (
    <section className="bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 py-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col justify-center text-center md:text-left space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Ремонт взуття
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ми спеціалізуємося на ремонті взуття будь-якої складності,
            використовуючи якісні матеріали для продовження його терміну служби.
          </p>
          <ul className="space-y-2 text-gray-700 text-lg">
            <li className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-left">Заміна підошви та каблуків</span>
            </li>
            <li className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-left">Реставрація швів та склеювання</span>
            </li>
            <li className="flex items-start gap-4">
              <svg
                className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-left">Полірування та фарбування шкіри</span>
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center px-6 pb-6 md:p-6">
          <img
            src={shoeRepairr}
            alt="Shoe repair process"
            className="w-full max-h-96 rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default ShoeRepair;
