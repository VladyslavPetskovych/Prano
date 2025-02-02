import React, { useState } from "react";
import { BurgerMenu } from "./burgerMenu";

// Оновлений компонент Dropdown для прийому опцій
function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="px-4 py-2 text-white hover:bg-sky-500 focus:outline-none">
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-40 bg-white text-black shadow-lg z-10">
          {options.map((option, index) => (
            <a
              href="#"
              key={index}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const [opened, setOpened] = useState(false);

  const buttonStyle =
    "px-4 py-2 mx-1 text-white hover:bg-sky-500 focus:outline-none";

  const servicesOptions = [
    "Хімчистка",
    "Пральня",
    "Чистка і реставрація взуття",
    "ремонт взуття",
  ];
  const pricesOptions = [
    "Хімчистка",
    "Пральня",
    "Чистка і реставрація взуття",
    "ремонт взуття",
  ];
 

  return (
    <nav className="bg-coolBlue h-16 flex items-center justify-between px-4 font-geologica">
      <h1 className="text-white">Prano</h1>
      <div className="hidden md:flex space-x-4">
        <span>
          <button className={buttonStyle}>Про нас</button>
        </span>
        <span>
          <Dropdown label="Послуги" options={servicesOptions} />
        </span>
        <span>
          <Dropdown label="Ціни" options={pricesOptions} />
        </span>
        <span>
          <button className={buttonStyle}>Контакти</button>
        </span>
        <span>
          <button className={buttonStyle}>Кабінет</button>
        </span>
      </div>
      <div className="block md:hidden">
        <BurgerMenu opened={opened} toggleOpened={() => setOpened(!opened)} />
      </div>
    </nav>
  );
}

export default Header;
