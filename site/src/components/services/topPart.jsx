import React from "react";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

function TopPart() {
  return (
    <div className=" pt-44 pb-12 text-center flex flex-row justify-center items-center" id="cleaning">
      <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-wide">
        НАШІ ПОСЛУГИ
      </h1>
      <img className="w-32" src={CatLogo} alt="" />
    </div>
  );
}

export default TopPart;
