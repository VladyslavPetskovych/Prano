import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BurgerMenu = ({ opened, toggleOpened }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { label: "Хімчистка", href: "/services#cleaning" },
    { label: "Прання", href: "/services#laundry" },
    { label: "Чистка взуття", href: "/services#shoes-cleaning" },
    { label: "Ремонт взуття", href: "/services#shoes-repair" },
    { label: "Ремонт одягу", href: "/services#clothing-repair" },
  ];

  return (
    <div>
      {/* Burger Icon */}
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

      {/* Mobile Menu */}
      {opened && (
        <div className="absolute top-16 right-0 w-full bg-coolBlue text-white py-4 space-y-4 flex flex-col items-center">
          <Link to="/about" className="text-xl hover:opacity-75" onClick={toggleOpened}>
            Про нас
          </Link>

          {/* Services Dropdown */}
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className="text-xl hover:opacity-75 flex items-center"
          >
            Послуги
            <span className={`ml-2 transform transition ${servicesOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          {servicesOpen && (
            <div className="w-full flex flex-col items-center space-y-2 mt-2">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="text-lg text-gray-200 hover:text-white"
                  onClick={toggleOpened}
                >
                  {service.label}
                </Link>
              ))}
            </div>
          )}

          <Link to="/price" className="text-xl hover:opacity-75" onClick={toggleOpened}>
            Ціни
          </Link>
          <Link to="/contacts" className="text-xl hover:opacity-75" onClick={toggleOpened}>
            Контакти
          </Link>
          <Link to="/blog" className="text-xl hover:opacity-75 border" onClick={toggleOpened}>
            Блог
          </Link>

          <Link to={isAuth ? "/account" : "/login"} className="text-xl hover:opacity-75" onClick={toggleOpened}>
            {isAuth ? "Профіль" : "Кабінет"}
          </Link>
        </div>
      )}
    </div>
  );
};

export { BurgerMenu };
