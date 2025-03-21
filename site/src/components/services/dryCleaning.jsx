import React from "react";
import dryCleaningg from "../../assets/service/dryCleaningg.jpg";

function DryCleaning() {
  return (
    <section className="bg-darkBlue py-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-lg">
        <div className="p-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Хімчистка</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Професійна хімчистка – це безпечний та ефективний спосіб видалення
            складних забруднень без пошкодження тканин. Ми використовуємо
            сучасні технології та екологічно чисті засоби для досягнення
            ідеального результату.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li className="flex items-start">
              - Делікатне очищення дорогих тканин
            </li>
            <li className="flex items-start">
              - Видалення плям без пошкодження матеріалу
            </li>
            <li className="flex items-start">
              - Безпечні та гіпоалергенні засоби
            </li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center p-6">
          <img
            src={dryCleaningg}
            alt="Dry cleaning process"
            className="w-full max-h-80 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

export default DryCleaning;
