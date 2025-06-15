import React from "react";
import { Link } from "react-router-dom";

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
          Здійснюємо доставку по Львову кур'єром і по Україні за допомогою
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
              <li>📍 Вулиця Липинського 54, Львів, Україна</li>
              <li>📍 Вулиця Під Дубом 26а, Львів, Україна</li>
              <li>📍 Проспект Червоної Калини 60, Львів, Україна</li>
              <li>📞 3806632146**</li>
              <li>✉️ pranolviv@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg">Послуги</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>
                <Link
                  to="/services#repair-clothes"
                  className="text-blue-600 hover:underline"
                >
                  Ремонт та корекція одягу
                </Link>
              </li>
              <li>
                <Link
                  to="/services#cleaning"
                  className="text-blue-600 hover:underline"
                >
                  Виведення плям
                </Link>
              </li>
              <li>
                <Link
                  to="/services#laundry"
                  className="text-blue-600 hover:underline"
                >
                  Прання
                </Link>
              </li>
              <li>
                <Link
                  to="/services#shoes-repair"
                  className="text-blue-600 hover:underline"
                >
                  Ремонт взуття
                </Link>
              </li>
              <li>
                <Link
                  to="/services#repair-bags"
                  className="text-blue-600 hover:underline"
                >
                  Реставрація сумок
                </Link>
              </li>
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
            Copyright 2025 Всі права захищені.{" "}
            <Link to="/privacy-policy" className="text-Ngold hover:underline">
              Політика конфіденційності
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
