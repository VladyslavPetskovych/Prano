import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import kid from "../../assets/landing/kid.jpg";

function Reception() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-between relative w-full bg-coolBlue my-10 py-5  overflow-hidden">
      <img
        src={kid}
        alt=""
        className="w-[60%] md:w-1/3"
        data-aos="fade-left"
      />
      <p
        className="absolute text-center right-4 md:bottom-10 bottom-4 text-gray-700 drop-shadow-lg shadow-2xl bg-white text-xs md:text-xl font-bold  w-2/3 p-5 pr-5"
        data-aos="fade-right"
      >
       Безпечні і перевірені засоби для виведення плям
      </p>
    </div>
  );
}

export default Reception;
