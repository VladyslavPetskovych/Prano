import React from "react";
import hand from "../../assets/account/handTelegram.png";
import telegramlogo from "../../assets/telegram/telegramPng.webp";

function TelegramBlock() {
  return (
    <a
      href="https://t.me/Prano_Lviv_bot"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed hidden bottom-3 left-4 md:flex flex-col items-center p-1 rounded-xl w-40 md:w-52"
    >
      <div className="bg-slate-500 text-white px-3 py-2 rounded-lg shadow-md relative text-sm md:text-base leading-snug transition-all duration-300 hover:shadow-xl hover:scale-105">
        <p>
          Відстежуйте своє замовлення у{" "}
          <span className="font-semibold">телеграм боті</span>
        </p>
        <div className="absolute flex top-[79%] left-[23%] items-center justify-center space-x-1">
          <div className="dot bg-white rounded-full w-1 h-1 animate-pulse delay-100"></div>
          <div className="dot bg-white rounded-full w-1 h-1 animate-pulse delay-200"></div>
          <div className="dot bg-white rounded-full w-1 h-1 animate-pulse delay-300"></div>
        </div>
        <div className="absolute -bottom-2 left-3 w-4 h-4 bg-slate-500 rotate-45"></div>
      </div>
      <div className="relative mt-1 transition-all duration-300 hover:scale-110">
        <img
          className="w-16 md:w-24 h-auto object-contain"
          src={hand}
          alt="Hand"
        />
        <img
          className="absolute top-1/2 left-[56%] transform -translate-x-1/2 -translate-y-1/2 w-10 md:w-7 h-auto"
          src={telegramlogo}
          alt="Telegram Logo"
        />
      </div>
    </a>
  );
}

export default TelegramBlock;
