import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dropdown({ label }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const options = isAuth
    ? [
        { label: "Хімчистка", href: "/services#cleaning" },
        { label: "Прання", href: "/services#laundry" },
        { label: "Чистка взуття", href: "/services#shoes-cleaning" },
        { label: "Ремонт взуття", href: "/services#shoes-repair" },
        { label: "Ремонт одягу", href: "/services#clothing-repair" },
      ]
    : [
        { label: "Хімчистка", href: "/services#cleaning" },
        { label: "Прання", href: "/services#laundry" },
      ];

  const handleMainClick = () => {
    navigate("/services");
    setIsOpen(false);
  };

  const handleItemClick = (href) => {
    navigate(href);
    setIsOpen(false);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
    
      <button
        onClick={handleMainClick}
        className="px-4 py-2 text-white  hover:opacity-75 focus:outline-none"
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-white text-black shadow-lg z-10 rounded-md overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(option.href)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
