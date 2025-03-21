import React from "react";
import sewingRepair from "../../assets/service/sewingRepair.jpg";

function SewingRepair() {
  return (
    <section className="bg-darkBlue py-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Шиття та ремонт одягу</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Наші професійні майстри допоможуть вам з ремонтом та підгонкою одягу, 
            забезпечуючи ідеальну посадку та відновлення улюблених речей.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-start">
            - Підгонка одягу по фігурі
            </li>
            <li className="flex items-start">
            - Заміна блискавок та ґудзиків
            </li>
            <li className="flex items-start">
            - Реставрація тканин та підшивання
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center p-6">
          <img
            src={sewingRepair}
            alt="Sewing and repair process"
            className="w-full max-h-80 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default SewingRepair;