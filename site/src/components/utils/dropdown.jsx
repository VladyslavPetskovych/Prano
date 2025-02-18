import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
      <Link to="/services">
        <button className="px-4 py-2 text-white hover:bg-bg-coolBlue hover:opacity-75 focus:outline-none">
          {label}
        </button>
      </Link>

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

export default Dropdown;
