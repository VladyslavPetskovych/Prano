import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import kid from "../../assets/landing/kid.jpg";

function Reception() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-blue-200 to-coolBlue my-10 py-12 px-6 md:px-10 lg:px-16 flex items-center justify-center overflow-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6 md:gap-10 lg:gap-16 w-full max-w-5xl">

        <div
          className="w-full md:w-1/2 flex justify-center"
          data-aos="fade-left"
        >
          <img
            src={kid}
            alt="Kid"
            className="w-[85%] md:w-[90%] lg:w-[75%] rounded-lg shadow-lg"
          />
        </div>

        <ul className="w-full md:w-1/2 space-y-4 md:space-y-5">
          {[
            "Дбайливий догляд за Вашими речами",
            "Безпечні та перевірені засоби для виведення плям",
            "Якість гарантовано професіоналами",
          ].map((text, index) => (
            <li
              key={index}
              className="bg-white text-gray-800 text-center text-sm md:text-lg font-semibold p-6 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              data-aos="fade-right"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reception;
