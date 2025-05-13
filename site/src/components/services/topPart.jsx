import React from "react";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

function TopPart() {
  return (
    <div className=" pt-44 pb-12 text-center flex flex-row justify-center items-center" id="cleaning">
      <h1 className="text-white text-2xl md:text-3xl font-extrabold tracking-wide after:content-[''] after:block after:w-32 after:h-1 after:mt-3 after:mx-auto after:bg-Ngold">
        НАШІ ПОСЛУГИ
      </h1>
      <img className="w-32" src={CatLogo} alt="" />
    </div>
  );
}

export default TopPart;
