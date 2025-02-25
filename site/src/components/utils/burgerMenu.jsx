import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BurgerMenu = ({ opened, toggleOpened }) => {
  const isAuth = useSelector((state) => state.auth.isAuth); 

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
          <Link
            to="/about"
            className="text-xl hover:opacity-75"
            onClick={toggleOpened}
          >
            Про нас
          </Link>
          <Link
            to="/services"
            className="text-xl hover:opacity-75"
            onClick={toggleOpened}
          >
            Послуги
          </Link>
          <Link
            to="/price"
            className="text-xl hover:opacity-75"
            onClick={toggleOpened}
          >
            Ціни
          </Link>
          <Link
            to="/contacts"
            className="text-xl hover:opacity-75"
            onClick={toggleOpened}
          >
            Контакти
          </Link>
          <Link
            to="/blog"
            className="text-xl hover:opacity-75 border"
            onClick={toggleOpened}
          >
            Блог
          </Link>

          <Link
            to={isAuth ? "/account" : "/login"}
            className="text-xl hover:opacity-75"
            onClick={toggleOpened}
          >
            {isAuth ? "Профіль" : "Кабінет"}
          </Link>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
