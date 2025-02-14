import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BurgerMenu } from "./burgerMenu";

function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/services") {
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="px-4 py-2 text-white hover:bg-bg-coolBlue hover:opacity-75 focus:outline-none">
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-40 bg-white text-black shadow-lg z-10">
          {options.map((option, index) => (
            <Link
              to={option.href}
              key={index}
              className="block px-4 py-2 hover:bg-gray-200"
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  const [opened, setOpened] = useState(false);

  const buttonStyle =
    "px-4 py-2 mx-1 text-white hover:bg-bg-coolBlue hover:opacity-75 focus:outline-none";

  const servicesOptions = [
    { label: "Хімчистка", href: "/services#cleaning" },
    { label: "Пральня", href: "/services#laundry" },
    { label: "Чистка і реставрація взуття", href: "/services#shoes-cleaning" },
    { label: "Ремонт взуття", href: "/services#shoes-repair" },
  ];

  return (
    <nav className="bg-coolBlue h-16 flex items-center justify-between px-6 font-playfair">
      <h1 className="text-white text-2xl font-bold">Prano</h1>
      <div className="hidden md:flex items-center space-x-5 text-xl">
        <Link to="/about" className={buttonStyle}>
          Про нас
        </Link>
        <Dropdown label="Послуги" options={servicesOptions} />
        <Link to="/price" className={buttonStyle}>
          Ціни
        </Link>
        <Link to="/contacts" className={buttonStyle}>
          Контакти
        </Link>
        <Link to="/blog" className={buttonStyle}>
          Блог
        </Link>
        <Link to="/cabinet" className={buttonStyle}>
          Кабінет
        </Link>
      </div>
      <div className="block md:hidden">
        <BurgerMenu opened={opened} toggleOpened={() => setOpened(!opened)} />
      </div>
    </nav>
  );
}

export default Header;
