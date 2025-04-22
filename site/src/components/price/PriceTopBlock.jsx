import React from "react";
import designer from "../../assets/price/Designer.png";
import designer2 from "../../assets/price/Designer2.jpeg";

function PriceTopBlock() {
  return (
    <div className="mt-1 bg-Nblue h-[210px]">
      <div className="flex flex-row justify-around items-center p-2">
        <img className="w-48 hidden md:block rounded-md" src={designer2} alt="" />
        <p className="text-white text-center text-2xl md:text-3xl font-extrabold tracking-wide">
          Найкращі ціни на ринку
        </p>
        <img className="w-48" src={designer} alt="" />
      </div>
    </div>
  );
}

export default PriceTopBlock;
