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
        className={classNames(`tham tham-e-squeeze !text-white tham-w-8`, {
          "tham-active": opened,
        })}
        onClick={toggleOpened}
      >
        <div className="tham-box">
          <div className="tham-inner" style={{ backgroundColor: "white" }} />
        </div>
      </div>

      {/* Mobile Menu */}
      {opened && (
        <div className="absolute h-screen mt-5 right-0 w-full bg-black text-white py-6 space-y-3 flex flex-col items-start pl-16">
          <Link
            to="/"
            className="text-2xl hover:opacity-80 transition ease-in-out duration-200"
            onClick={toggleOpened}
          >
            Про нас
          </Link>

          {/* Services Dropdown */}
          <button
            onClick={() => setServicesOpen(!servicesOpen)}
            className={`text-2xl flex items-center transition ease-in-out duration-200  ${
              servicesOpen ? "" : ""
            }`}
          >
            <span
              className={`ml-2 transform transition duration-200 ${
                servicesOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
            Послуги
            <span
              className={`ml-2 transform transition duration-200 ${
                servicesOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {/* Dropdown items */}
          {servicesOpen && (
            <div className="w-full flex flex-col items-start space-y-1 mt-2 pl-4">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={service.href}
                  className="text-lg text-gray-200  transition duration-200"
                  onClick={toggleOpened}
                >
                  ○ {service.label}
                </Link>
              ))}
            </div>
          )}

          {/* Other Links */}
          {["Ціни", "Контакти", "Блог"].map((label, index) => (
            <Link
              key={index}
              to={`/${label}`}
              className="text-2xl hover:opacity-80 transition ease-in-out duration-200"
              onClick={toggleOpened}
            >
              {label}
            </Link>
          ))}

          {/* Profile Link */}
          <Link
            to={isAuth ? "/account" : "/login"}
            className="text-2xl hover:opacity-80 transition ease-in-out duration-200"
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
