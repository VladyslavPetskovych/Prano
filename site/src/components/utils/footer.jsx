import React from "react";
import { Link } from "react-router-dom";

import { FaTiktok, FaInstagram, FaTelegram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center  py-2 border-b font-bold text-lg border-gray-700">
          Доставляємо по Львову кур'єром і по Україні — поштою
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div>
            <h3 className="font-bold text-lg">Контакти</h3>
            <p>📞 380771515111</p>
            <p>✉️ pranolviv@gmail.com</p>
            <div className="mt-8">
              <h3 className="font-bold ">Виробництво і головний офіс</h3>
              <p>📍 Вулиця Липинського, 54, Львів </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg">Пункти прийому</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>📍 Вулиця Липинського, 54, Львів </li>
              <li>📍 Вулиця Під Дубом, 26а, Львів</li>
              <li>📍 Проспект Червоної Калини, 60, Львів</li>
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
                  Хімчистка одягу
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
                  Чистка та реставрація взуття
                </Link>
              </li>
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
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@prano.group2?_t=ZM-8yKRhHt8ubI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
            >
              <FaTiktok />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/pranogroup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-full hover:opacity-80"
            >
              <FaInstagram />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/Prano_Lviv_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#229ED9] text-white p-2 rounded-full hover:bg-[#1b8dbd]"
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
