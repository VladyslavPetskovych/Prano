import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import shoeImg from "../../assets/home/shoe.jpg";

function Shoe() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="text-white py-3 px-5 overflow-hidden group">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="relative overflow-hidden md:col-span-3 min-h-[500px]"
          data-aos="fade-right"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${shoeImg})` }}
          ></div>

          <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-50 transition duration-500"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10">
            <h1
              className="text-xl md:text-3xl font-bold uppercase"
              data-aos="zoom-in"
            >
              РЕМОНТ ВЗУТТЯ <br /> І АКСЕСУАРІВ
            </h1>
            <button
              className="mt-6 px-6 py-2 border border-white text-white uppercase hover:bg-white hover:text-black transition"
              data-aos="fade-up"
            >
              Дізнатися більше
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shoe;
