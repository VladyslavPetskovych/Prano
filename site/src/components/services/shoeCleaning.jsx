import React from "react";
import shoeCleaning from "../../assets/service/shoes.jpg";

function ShoeCleaningRepair() {
  return (
    <section className="bg-darkBlue py-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">
            Чистка взуття
          </h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Ми пропонуємо професійну чистку та ремонт взуття, щоб повернути йому
            первозданний вигляд і продовжити термін служби. Використовуємо
            тільки якісні та безпечні засоби.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>- Видалення плям та забруднень</li>
            <li>- Реставрація кольору та матеріалу</li>
            <li>- Професійний догляд</li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center p-6">
          <img
            src={shoeCleaning}
            alt="Shoe cleaning process"
            className="w-full max-h-80 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default ShoeCleaningRepair;
