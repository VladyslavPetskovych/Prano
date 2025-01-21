import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu"; // Adjust the import path as necessary

const Header = () => {
  const [opened, setOpened] = useState(false);

  const buttonStyle =
    "px-4 py-2 mx-1 text-white hover:bg-sky-500 focus:outline-none";

  return (
    <nav className="bg-sky-400 h-16 flex items-center justify-around px-4">
      <h1>Prano</h1>
      <div className="hidden md:block">
        <span>
          <button className={buttonStyle}>Головна</button>
        </span>
        <span>
          <button className={buttonStyle}>Прання</button>
        </span>
        <span>
          <button className={buttonStyle}>Хімчистка</button>
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
};

export { Header };
