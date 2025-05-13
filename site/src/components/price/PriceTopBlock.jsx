import React from "react";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

function PriceTopBlock() {
  return (
    <div className="mt-1 px-4 bg-Nblue h-[160px] md:h-[210px] flex justify-center items-center">
      <h2
        className=" text-white text-3xl md:text-5xl font-extrabold tracking-wide sm:text-4xl  text-center  relative inline-block after:content-[''] after:block after:w-32 after:h-1 after:mt-3 after:mx-auto after:bg-Ngold"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        ЦІНИ НА НАШІ ПОСЛУГИ
      </h2>
      <img className="w-32" src={CatLogo} alt="" />
    </div>
  );
}

export default PriceTopBlock;
