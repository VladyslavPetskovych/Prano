import React from "react";
import dryCleaningPhoto from "../../assets/home/drycleaning.jpg";
import laundryPhoto from "../../assets/home/laundryy.jpg";
import { Link } from "react-router-dom";

function dryCleaning() {
  return (
    <div className="text-white py-4 px-5 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
        <div
          className="relative group overflow-hidden md:col-span-2 h-full"
          data-aos="fade-right"
        >
          <img
            src={laundryPhoto}
            alt="Leather & Fur Care"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-60 p-4">
            <h3
              className="text-xl md:text-2xl font-semibold drop-shadow-lg"
              data-aos="zoom-in"
            >
              ХІМЧИСТКА
            </h3>
            <Link
              to="/services#cleaning"
              className="mt-4 border border-white px-6 py-2 text-lg font-medium text-white uppercase hover:bg-white hover:text-black transition duration-300"
              data-aos="fade-up"
            >
              ДІЗНАТИСЯ БІЛЬШЕ
            </Link>
          </div>
        </div>
        <div
          className="relative group overflow-hidden h-full"
          data-aos="fade-left"
        >
          <img
            src={dryCleaningPhoto}
            alt="Textile Care"
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-60 p-4">
            <h3
              className="text-xl md:text-2xl font-semibold drop-shadow-lg"
              data-aos="zoom-in"
            >
              ПРАННЯ
            </h3>
            <Link
             to="/services#laundry"
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

export default dryCleaning;
