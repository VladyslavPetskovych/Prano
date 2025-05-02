import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./dropdown";
import { BurgerMenu } from "./burgerMenu";
import { useSelector } from "react-redux";
import logo from "../../assets/logo/svgTextCatGold.svg";

function Header() {
  const [opened, setOpened] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);

  const buttonStyle =
    "px-4 py-2 mx-1 text-white hover:bg-bg-coolBlue hover:opacity-75 focus:outline-none";

  const servicesOptions = [
    { label: "Хімчистка", href: "/services#cleaning" },
    { label: "Пральня", href: "/services#laundry" },
    { label: "Чистка і реставрація взуття", href: "/services#shoes-cleaning" },
    { label: "Ремонт взуття", href: "/services#shoes-repair" },
  ];

  return (
    <nav
      className={`fixed z-50 w-full mt-7 h-16 flex items-center  justify-between px-6 font-playfair transition-all duration-300 ${
        opened ? "bg-Ndark" : "bg-Ndark"
      }`}
    >
      <Link to="/" onClick={() => setOpened(false)}>
        <img src={logo} alt="logo" className="h-12 pt-1" />
      </Link>

      <div className="hidden md:flex items-center space-x-5 text-xl">
        <Link to="/" className={buttonStyle}>
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

        {!isAuth ? (
          <Link to="/login" className="text-white">
            Увійти
          </Link>
        ) : (
          <Link to="/account" className="text-white">
            Профіль
          </Link>
        )}
      </div>
      <div className="block md:hidden">
        <BurgerMenu opened={opened} toggleOpened={() => setOpened(!opened)} />
      </div>
    </nav>
  );
}

export default Header;
