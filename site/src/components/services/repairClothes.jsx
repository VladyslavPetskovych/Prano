import React from "react";
import repairImage from "../../assets/service/sew.jpg"; // Update with your actual repair image

const clothingRepairFeatures = [
  "Підгонка одягу по фігурі",
  "Заміна блискавок та ґудзиків",
  "Реставрація тканин та підшивання",
];

function ClothingRepair() {
  return (
    <section
      className="py-16 px-6 mx-6 md:mx-auto max-w-6xl rounded-2xl bg-gray-50 shadow-xl"
      id="repair-clothes"
    >
      <h2 className="text-4xl md:text-5xl mx-auto font-extrabold text-gray-800 tracking-wide text-center mb-12">
        Ремонт одягу
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-[400px] overflow-hidden rounded-2xl shadow-xl">
          <img
            src={repairImage}
            alt="Clothing repair"
            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="w-full md:w-1/2 h-[400px] bg-white rounded-2xl shadow-lg p-8 md:p-10 flex flex-col justify-center space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Відновлюємо улюблені речі: підганяємо по фігурі, лагодимо застібки,
            підшиваємо та реставруємо тканину. Індивідуальний підхід до кожної
            речі.
          </p>
          <ul className="text-gray-800 text-lg space-y-3">
            {clothingRepairFeatures.map((feature, index) => (
              <li key={index} className="flex items-start">
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
      </div>
    </section>
  );
}

export default ClothingRepair;
