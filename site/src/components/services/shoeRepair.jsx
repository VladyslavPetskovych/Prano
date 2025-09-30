import React from "react";
import shoeRepairr from "../../assets/service/shoeRepair.jpg";

function ShoeRepair() {
  const features = [
    "Заміна підошви та каблуків",
    "Реставрація швів та склеювання",
    "Полірування та фарбування шкіри",
  ];
  return (
    <section className="my-6 py-9 mx-6 rounded-2xl bg-gray-50  shadow-xl" id="shoes-remont">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 bg-white rounded-3xl  overflow-hidden">
        <div className="p-8 flex flex-col justify-center text-center md:text-left space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-wide">
            Ремонт взуття
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Заміна підборів, фурнітури, підклеювання, реставрація шкіри та
            підошви — щоб ваша улюблена пара знову стала зручною і надійною.
          </p>
          <ul className=" text-gray-700  text-lg flex flex-col items-start justify-center ">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start ">
                <svg
                  className="w-3 h-3 mt-2 mx-3 text-Ndark flex-shrink-0"
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
                <span className="text-left">{feature}</span>
              </li>
            ))}
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
