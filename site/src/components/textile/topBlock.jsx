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
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">
            Оновіть свій гардероб вже сьогодні
          </h1>
          
        </div>

        <p className="text-lg md:text-xl text-white/80 leading-relaxed">
          Відкрийте для себе преміальне текстильне обслуговування разом з{" "}
          <span className="font-semibold text-Ngold">Prano</span>. Ми пропонуємо
          професійні послуги з догляду, ремонту та зберігання текстильних
          виробів — з любов’ю до якості та деталей.
        </p>

        <Link to="/price">
          <button className="mt-4 bg-Ngold text-Ndark font-bold px-8 py-3 rounded-xl shadow-md hover:bg-opacity-80 transition-all duration-300">
            ДИВИТИСЬ ЦІНИ
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TopBlock;
