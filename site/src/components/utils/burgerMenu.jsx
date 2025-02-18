import classNames from "classnames";
import React from 'react';
import { Link } from "react-router-dom";

const BurgerMenu = ({ opened, toggleOpened }) => {
  return (
    <div>
      <div
        className={classNames(`tham tham-e-squeeze tham-w-6`, {
          "tham-active": opened,
        })}
        onClick={toggleOpened}
      >
        <div className="tham-box">
          <div className="tham-inner" />
        </div>
      </div>

      {opened && (
        <div className="absolute top-16 right-0 w-full bg-coolBlue text-white py-4 space-y-4 flex flex-col items-center">
          <Link to="/about" className="text-xl hover:opacity-75">
            Про нас
          </Link>
          <Link to="/services" className="text-xl hover:opacity-75">
            Послуги
          </Link>
          <Link to="/price" className="text-xl hover:opacity-75">
            Ціни
          </Link>
          <Link to="/contacts" className="text-xl hover:opacity-75">
            Контакти
          </Link>
          <Link to="/blog" className="text-xl hover:opacity-75 border">
            Блог
          </Link>
          <Link to="/register" className="text-xl hover:opacity-75">
            Кабінет
          </Link>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
