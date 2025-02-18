import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown"; 
import { BurgerMenu } from "./burgerMenu";

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
    <nav className="fixed z-50 w-full mt-7 bg-coolBlue h-16 flex items-center justify-between px-6 font-playfair">
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
        <Link to="/register" className="text-white">
          Реєстрація
        </Link>
      </div>
      <div className="block md:hidden">
        
        <BurgerMenu opened={opened} toggleOpened={() => setOpened(!opened)} />
      </div>
    </nav>
  );
}

export default Header;
