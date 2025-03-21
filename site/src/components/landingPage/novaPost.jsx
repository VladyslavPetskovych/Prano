import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import nova from "../../assets/landing/nova.png";

function NovaPost() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="flex items-center justify-between  w-full bg-coolBlue  pl-5 overflow-hidden ">
      <p
        className="text-center text-gray-700 drop-shadow-lg shadow-2xl bg-white text-xs md:text-xl font-bold w-full md:w-1/2 p-5"
        data-aos="fade-right"
      >
        Відправляй речі та отримуй їх назад поштою або кур'єром.
      </p>
      <img src={nova} alt="" className="w-[60%] md:w-1/3" data-aos="fade-left" />
    </div>
  );
}

export default NovaPost;
