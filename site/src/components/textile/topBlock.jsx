import React from "react";
import textileMain from "../../assets/textile/textileMain.jpg";
import { Link } from "react-router-dom";
import CatLogo from "../../assets/logo/CatLogoGold.svg";

function TopBlock() {
  return (
    <div className="bg-Ndark text-white py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="w-full md:w-1/2 relative group">
        <img
          src={textileMain}
          alt="Стійка з одягом"
          className="rounded-2xl w-full object-cover shadow-lg  transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent rounded-2xl pointer-events-none" />
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
        <div className="flex md:flex-row   gap-4">
          <h1 className="text-2xl md:text-4xl font-extrabold font-tinos leading-tight tracking-tight">
            Потурбуйтесь про свій гардероб вже сьогодні
          </h1>
        </div>

        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
          Відкрийте для себе преміальне текстильне обслуговування разом з{" "}
          <span className="font-semibold text-Ngold">Prano</span>. Ми пропонуємо
          професійні послуги з догляду та ремонту текстильних виробів — з
          любов’ю до якості та деталей.
        </p>

        <Link to="/price">
          <button
            className="mt-6 inline-block font-bold bg-Ngold hover:bg-opacity-90 text-white text-lg py-3 px-8 rounded-lg shadow-lg  transition duration-300"
            style={{
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            ДИВИТИСЬ ЦІНИ
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TopBlock;
