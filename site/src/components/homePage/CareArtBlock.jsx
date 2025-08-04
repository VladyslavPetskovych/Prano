import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import fur from "../../assets/home/fur.webp";
import textile from "../../assets/home/textile.jpg";
import { Link } from "react-router-dom";

function CareArtBlock() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="text-white py-4 px-5 overflow-hidden">
      <div className="flex justify-center">
        <h2
          className="text-xl  md:text-3xl font-bold mt-2 p-3 md:px-24 font-tinos text-center bg-white text-Ndark relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7"
          data-aos="fade-up"
        >
          ДОСКОНАЛІСТЬ БЕЗ КОМПРОМІСІВ
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
        <div
          className="relative group overflow-hidden h-full"
          data-aos="fade-right"
        >
          <img
            src={textile}
            alt="Textile Care"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-60 p-4">
            <h3
              className="text-xl md:text-2xl font-semibold drop-shadow-lg"
              data-aos="zoom-in"
            >
              ДОГЛЯД ЗА ТЕКСТИЛЬНИМ ОДЯГОМ
            </h3>
            <Link
              to="/textile"
              className="mt-4 border border-white px-6 py-2 text-lg font-medium hover:bg-white hover:text-black transition duration-300"
              data-aos="fade-up"
            >
              ДІЗНАТИСЯ БІЛЬШЕ
            </Link>
          </div>
        </div>

        <div
          className="relative group overflow-hidden md:col-span-2 h-full"
          data-aos="fade-left"
        >
          <img
            src={fur}
            alt="Leather & Fur Care"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-60 p-4">
            <h3
              className="text-xl md:text-2xl font-semibold drop-shadow-lg"
              data-aos="zoom-in"
            >
              ЧИСТКА РЕЧЕЙ ЗІ ШКІРИ І ХУТРА
            </h3>
            <Link
              to="/fur"
              className="mt-4 border border-white px-6 py-2 text-lg font-medium hover:bg-white hover:text-black transition duration-300"
              data-aos="fade-up"
            >
              ДІЗНАТИСЯ БІЛЬШЕ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareArtBlock;
