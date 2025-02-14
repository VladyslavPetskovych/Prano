import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Огляд компанії */}
          <div>
            <h3 className="font-bold text-lg">Про компанію</h3>
            <p className="mt-4 text-sm">
              Ми прагнемо до досконалості та задоволення клієнтів, забезпечуючи
              високу якість і інноваційні рішення, які відповідають вашим
              потребам.
            </p>
          </div>

          {/* Контакт */}
          <div>
            <h3 className="font-bold text-lg">Контакт</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>
                <span className="inline-block text-red-500">📍</span> 123
                Вулиця, Місто, Львів, Україна
              </li>
              <li>
                <span className="inline-block text-red-500">📞</span> 999 673
                984
              </li>
              <li>
                <span className="inline-block text-red-500">✉️</span>{" "}
                support@yourdomain.com
              </li>
            </ul>
          </div>

          {/* Послуги */}
          <div>
            <h3 className="font-bold text-lg">Послуги</h3>
            <ul className="mt-4 text-sm space-y-2">
              <li>Ремонт та корекція одягу</li>
              <li>Виведення плям</li>
              <li>Праска та прасування</li>
            </ul>
          </div>
        </div>

        {/* Роздільник */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            Copyright 2024 Всі права захищені. Створено{" "}
            {"відділом ІТ Royal Apart"}
          </p>

          {/* Соціальні іконки */}
          <div className="mt-4 flex justify-center space-x-4">
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="bg-white text-red-500 p-2 rounded-full hover:bg-gray-200"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
