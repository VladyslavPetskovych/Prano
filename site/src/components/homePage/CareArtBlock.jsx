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
    <div className="bg-black text-white py-10 px-5 overflow-hidden">
      <h2 className="text-center text-2xl font-bold mb-8">
        МИСТЕЦТВО ДОГЛЯДУ ЗА РЕЧАМИ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
        <div
          className="relative group overflow-hidden h-full"
          data-aos="slide-right"
        >
          <img
            src={textile}
            alt="Textile Care"
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold">
              ДОГЛЯД ЗА ТЕКСТИЛЬНИМ ОДЯГОМ
            </h3>
            <button className="mt-4 border border-white px-4 py-2 hover:bg-white hover:text-black transition">
              ДІЗНАТИСЯ БІЛЬШЕ
            </button>
          </div>
        </div>
        <div
          className="relative group overflow-hidden md:col-span-2 h-full"
          data-aos="slide-left"
        >
          <img
            src={fur}
            alt="Leather & Fur Care"
            className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50 p-4">
            <h3 className="text-xl font-semibold">
              ЧАСТКА РЕЧЕЙ ЗІ ШКІРИ І ХУТРА
            </h3>
            <button className="mt-4 border border-white px-4 py-2 hover:bg-white hover:text-black transition">
              ДІЗНАТИСЯ БІЛЬШЕ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareArtBlock;
