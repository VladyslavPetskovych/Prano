import React from "react";
import { Link } from "react-router-dom";
import { FaTiktok, FaInstagram, FaTelegram } from "react-icons/fa";
import { FiMapPin, FiClock, FiPhone, FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="text-center py-2 border-b font-bold text-lg border-gray-700">
          Доставляємо по Львову кур'єром і по Україні — поштою
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Контакти */}
          <div>
            <h3 className="font-bold text-lg">Контакти</h3>

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <FiPhone className="text-Ngold shrink-0" />
                <a href="tel:380771515111" className="hover:text-Ngold">
                  380771515111
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FiMail className="text-Ngold shrink-0" />
                <a
                  href="mailto:pranolviv@gmail.com"
                  className="hover:text-Ngold"
                >
                  pranolviv@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-bold">Виробництво і головний офіс</h3>

              {/* Адреса */}
              <div className="mt-3 flex items-start gap-2">
                <FiMapPin className="text-Ngold mt-0.5 shrink-0" />
                <p>Вулиця Липинського, 54, Львів</p>
              </div>

              {/* Графік (бейджі) */}
              <div className="mt-2 flex items-center gap-2 ml-6 text-xs text-gray-300">
                <FiClock className="text-Ngold shrink-0" />
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  Пн–Пт: 09:00–18:00
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                  Сб–Нд: вихідні
                </span>
              </div>
            </div>
          </div>

          {/* Пункти прийому */}
          <div>
            <h3 className="font-bold text-lg">Пункти прийому</h3>
            <ul className="mt-4 text-sm space-y-5">
              {/* Липинського */}
              {/* Леоленд — новий пункт */}
              <li>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-Ngold mt-0.5 shrink-0" />
                  <p className="font-medium flex items-center gap-2">
                    ТРЦ Leoland, Мельника, 18
                    <span
                      className="
          text-[10px] 
          px-2 py-1 
          rounded-md 
          font-bold 
          bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500
          text-black 
          shadow-[0_0_8px_rgba(255,215,0,0.7)]
          animate-[pulse_1.8s_ease-in-out_infinite]
          border border-yellow-200
        "
                    >
                      NEW
                    </span>
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-2 ml-6 text-xs text-gray-300">
                  <FiClock className="text-Ngold shrink-0" />
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Пн–Пт: 09:00–20:00
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Сб–Нд: 11:00–20:00
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-Ngold mt-0.5 shrink-0" />
                  <p className="font-medium">Вулиця Липинського, 54, Львів</p>
                </div>
                <div className="mt-2 flex items-center gap-2 ml-6 text-xs text-gray-300">
                  <FiClock className="text-Ngold shrink-0" />
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Пн–Пт: 09:00–18:00
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Сб–Нд: вихідні
                  </span>
                </div>
              </li>

              {/* Під Дубом */}
              <li>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-Ngold mt-0.5 shrink-0" />
                  <p className="font-medium">Вулиця Під Дубом, 26а, Львів</p>
                </div>
                <div className="mt-2 flex items-center gap-2 ml-6 text-xs text-gray-300">
                  <FiClock className="text-Ngold shrink-0" />
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Пн–Пт: 09:00–20:00
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Сб–Нд: 11:00–20:00
                  </span>
                </div>
              </li>

              {/* Сихів */}
              <li>
                <div className="flex items-start gap-2">
                  <FiMapPin className="text-Ngold mt-0.5 shrink-0" />
                  <p className="font-medium">
                    Проспект Червоної Калини, 60, Львів
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 ml-6 text-xs text-gray-300">
                  <FiClock className="text-Ngold shrink-0" />
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Пн–Пт: 09:00–20:00
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1">
                    Сб–Нд: 11:00–20:00
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Послуги */}
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
                  Прання постільної білизни та рушників
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

        {/* Соцмережі + копірайт */}
        <div className="mt-2 border-t border-gray-700 py-2 text-center">
          <div className="my-4 flex justify-center space-x-4">
            <a
              href="https://www.tiktok.com/@prano.group2?_t=ZM-8yKRhHt8ubI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded-full hover:bg-gray-200"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.instagram.com/pranogroup"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-2 rounded-full hover:opacity-80"
            >
              <FaInstagram />
            </a>
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
