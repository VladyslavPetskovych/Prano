import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dropdown({ label, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
        className="px-4 py-2 text-white hover:opacity-75 focus:outline-none"
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-0 w-56 bg-white shadow-lg z-50 rounded-md overflow-hidden">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(option.href)}
              className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200"
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
