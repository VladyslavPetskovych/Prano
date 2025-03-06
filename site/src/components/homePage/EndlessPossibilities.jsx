import React from "react";

function EndlessPossibilities() {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-extrabold mb-6 text-amber-400">
            Необмежені Можливості
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Ми пропонуємо професійні послуги догляду за одягом, гарантуючи
            ідеальну чистоту та довговічність ваших речей.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-amber-400">
              <span className="mr-2">🧺</span>
              <span className="text-white font-medium">Професійне прання</span>
            </li>
            <li className="flex items-center text-amber-400">
              <span className="mr-2">✂️</span>
              <span className="text-white font-medium">Ремонт та корекція</span>
            </li>
            <li className="flex items-center text-amber-400">
              <span className="mr-2">🧼</span>
              <span className="text-white font-medium">
                Видалення складних плям
              </span>
            </li>
          </ul>
        </div>

        <div className="md:w-1/3 mt-8 md:mt-0 md:pl-12 flex justify-center relative">
          <div className="relative flex flex-col md:flex-row gap-4">
            <img
              src="//images.pexels.com/photos/5087727/pexels-photo-5087727.jpeg"
              alt="Прання"
              className="rounded-lg shadow-xl object-cover w-[250px] h-[250px] lg:w-[220px] lg:h-[300px] hover:scale-105 transition duration-300"
            />
            <img
              src="//images.pexels.com/photos/5661252/pexels-photo-5661252.jpeg"
              alt="Догляд за одягом"
              className="rounded-lg shadow-xl object-cover w-[250px] h-[250px] lg:w-[220px] lg:h-[300px] hover:scale-105 transition duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EndlessPossibilities;
