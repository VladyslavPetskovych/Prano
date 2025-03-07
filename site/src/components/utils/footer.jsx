import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm py-2 border-b border-gray-700">
          Здійснюємо доставку по Львову кур'єром і по Україні за допомогою Нової
          пошти
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div>
            <h3 className="font-bold text-lg">Про компанію</h3>
            <p className="mt-4 text-sm">
              Ми прагнемо до досконалості та задоволення клієнтів, забезпечуючи
              високу якість і інноваційні рішення, які відповідають вашим
              потребам.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg">Контакти</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>📍 123 Вулиця, Місто, Львів, Україна</li>
              <li>📞 38012345678</li>
              <li>✉️ pranolviv@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg">Послуги</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>Ремонт та корекція одягу</li>
              <li>Виведення плям</li>
              <li>Праска та прасування</li>
            </ul>
          </div>
        </div>

        <div className="mt-2 border-t border-gray-700 py-2 text-center">
          <div className="my-4 flex justify-center space-x-4">
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <FaTelegram />
            </a>
          </div>
          <p className="text-sm">
            Copyright 2025 Всі права захищені. Створено відділом ІТ Royal Apart
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
