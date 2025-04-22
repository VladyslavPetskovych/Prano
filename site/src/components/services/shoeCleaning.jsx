import React from "react";
import shoeCleaning from "../../assets/service/shoes.jpg";

function ShoeCleaningRepair() {
  return (
    <section className="my-6 py-6 mx-6 rounded-2xl bg-gray-50  shadow-xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 bg-white rounded-3xl  overflow-hidden">
        <div className="p-8 flex flex-col justify-center text-center md:text-left space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Чистка взуття
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Ми пропонуємо професійну чистку та ремонт взуття, щоб повернути йому
            первозданний вигляд і продовжити термін служби. Використовуємо
            тільки якісні та безпечні засоби.
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
              <span className="text-left">Видалення плям та забруднень</span>
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
              <span className="text-left">
                Реставрація кольору та матеріалу
              </span>
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
              <span className="text-left">Професійний догляд</span>
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center px-6 pb-6 md:p-6">
          <img
            src={shoeCleaning}
            alt="Shoe cleaning process"
            className="w-full max-h-96 rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default ShoeCleaningRepair;
