import React, { useEffect } from "react";
import AOS from "aos";
import { FaCheckCircle } from "react-icons/fa";
import hand from "../../assets/account/handTelegram.png";
import telegramlogo from "../../assets/telegram/telegramPng.webp";

export default function AutomationBlock() {
  useEffect(() => {
    AOS.init({ duration: 400, once: false });
  }, []);
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between bg-white p-12 rounded-lg shadow-lg">
      <div className="relative flex-1 flex justify-center">
        <div className="relative">
          <img className="w-96 h-auto object-contain" src={hand} alt="Hand" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              className="w-16 md:w-20 h-auto ml-7 translate-x-2 translate-y-1"
              src={telegramlogo}
              alt="Telegram Logo"
            />
          </div>
        </div>
      </div>

      <div className="p-3 w-full lg:w-1/2 ">
        <h2 className="text-orange-500 text-2xl md:text-4xl font-bold mb-4">
          ЗРУЧНИЙ ТЕЛЕГРАМ БОТ:
        </h2>
        <ul className="text-base md:text-lg ">
          <li className="flex items-start  text-gray-700 mb-2">
            <FaCheckCircle className="text-orange-500 mr-4 w-6 h-6 flex-shrink-0" />
            Перевіряй статус замовлень швидко у Telegram чат-боті
          </li>
          <li className="flex items-start  text-gray-700 mb-2">
            <FaCheckCircle className="text-orange-500 mr-4 w-6 h-6 flex-shrink-0" />
            Отримай адреси пунктів прийому
          </li>
          <li className="flex items-start  text-gray-700 mb-2">
            <FaCheckCircle className="text-orange-500 mr-4 w-6 h-6 flex-shrink-0" />
            Онлайн оплата Apple Pay / Google Pay
          </li>
          <li className="flex items-start  text-gray-700 mb-2">
            <FaCheckCircle className="text-orange-500 mr-4 w-6 h-6 flex-shrink-0" />
            Інформація про актуальні промокоди і знижки
          </li>
          <li className="flex items-start  text-gray-700 mb-2">
            <FaCheckCircle className="text-orange-500 mr-4 w-6 h-6 flex-shrink-0" />
            Всі необхідні контакти для зв'язку з нами
          </li>
          <li className="flex w-full items-start justify-center lg:pr-72 text-gray-700">
            <a
              href="https://t.me/Prano_Lviv_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 border border-orange-500 text-orange-500 px-6 py-2 text-lg font-medium hover:bg-white hover:text-orange-400 transition duration-300"
              data-aos="fade-up"
            >
              ПЕРЕЙТИ В БОТ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
