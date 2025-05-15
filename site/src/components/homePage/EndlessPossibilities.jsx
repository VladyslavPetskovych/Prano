import React from "react";
import brand1 from "../../assets/home/prem1.jpg";
import brand2 from "../../assets/home/prem2.jpg";
import SliderPremium from "./sliderPremium";
import { Link } from "react-router-dom";

function EndlessPossibilities() {
  return (
    <section className="bg-gray-900 py-16 text-white">
      <div className="container mx-auto px-6 font-tinos flex flex-col md:flex-row items-center md:items-center gap-12 ">
        {/* Text Section */}
        <div className="w-full md:w-1/3 text-center flex flex-col items-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-Ngold">
            ПРЕМІУМ ПОСЛУГИ
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-3">
            Ми пропонуємо професійні послуги та преміум догляд за одягом,
            гарантуючи ідеальну чистоту та довговічність ваших речей.
          </p>
          <Link
            to="/account"
            className="mt-6 inline-block font-manrope bg-Ndark bg-opacity-80 text-white text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-[#c4a75c] transition duration-300"
            style={{
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Дізнатись детальніше
          </Link>
        </div>

        <div className="w-full md:w-2/3 flex flex-col sm:flex-row justify-center items-center gap-1">
          <img
            src={brand1}
            alt="Прання"
            className="rounded-lg hidden lg:block shadow-xl object-cover w-full max-w-[250px] h-[250px] lg:w-[220px] lg:h-[300px] hover:scale-105 transition duration-300"
          />

          <SliderPremium />

          <img
            src={brand2}
            alt="Догляд за одягом"
            className="rounded-lg hidden lg:block shadow-xl object-cover w-full max-w-[250px] h-[250px] lg:w-[220px] lg:h-[300px] hover:scale-105 transition duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default EndlessPossibilities;
