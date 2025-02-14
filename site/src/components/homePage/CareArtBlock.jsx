import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import fur from "../../assets/home/fur.jpg";
import textile from "../../assets/home/textile.jpg";

function CareArtBlock() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, disable: "phone" });
  }, []);

  return (
    <div className="text-white py-4 px-5 overflow-hidden">
      <div className="flex justify-center">
        {" "}
        {/* Added flexbox for centering the heading */}
        <h2
          className="font-playfair text-3xl text-black md:text-4xl font-bold my-7 p-4 inline-block bg-white text-center"
          data-aos="fade-up"
        >
          МИСТЕЦТВО ДОГЛЯДУ ЗА РЕЧАМИ
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
            <button
              className="mt-4 border border-white px-6 py-2 text-lg font-medium hover:bg-white hover:text-black transition duration-300"
              data-aos="fade-up"
            >
              ДІЗНАТИСЯ БІЛЬШЕ
            </button>
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
            <button
              className="mt-4 border border-white px-6 py-2 text-lg font-medium hover:bg-white hover:text-black transition duration-300"
              data-aos="fade-up"
            >
              ДІЗНАТИСЯ БІЛЬШЕ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareArtBlock;
