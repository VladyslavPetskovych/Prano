import React, { useState } from "react";
import { BurgerMenu } from "./burgerMenu"; // Adjust the import path as necessary

const Header = () => {
  const [opened, setOpened] = useState(false);

  const buttonStyle =
    "px-4 py-2 mx-1 text-white hover:bg-sky-500 focus:outline-none";

  return (
    <div>
      <div className="h-7 bg-white flex justify-between items-center">
        <p></p>
        <div className="flex flew-row ">
          <p>pranolviv@gmail.com</p>
          <p className="mx-5">📞 999 673 984</p>
        </div>
      </div>
      <nav className="bg-coolBlue h-16 flex items-center justify-around px-4 font-geologica">
        <h1 className=" ">Prano</h1>
        <div className="hidden md:block">
          <span>
            <button className={buttonStyle}>Про нас</button>
          </span>
          <span>
            <button className={buttonStyle}>Послуги</button>
          </span>
          <span>
            <button className={buttonStyle}>Ціни</button>
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
    </div>
  );
};

export { Header };
