import React from "react";
import shoeRepairr from "../../assets/service/shoeRepair.jpg";

function ShoeRepair() {
  return (
    <section className="bg-darkBlue py-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Ремонт взуття</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Ми спеціалізуємося на ремонті взуття будь-якої складності,
            використовуючи якісні матеріали для продовження його терміну служби.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-start">- Заміна підошви та каблуків</li>
            <li className="flex items-start">
              - Реставрація швів та склеювання
            </li>
            <li className="flex items-start">
              - Полірування та фарбування шкіри
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center p-6">
          <img
            src={shoeRepairr}
            alt="Shoe repair process"
            className="w-full max-h-80 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default ShoeRepair;
