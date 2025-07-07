import React from "react";

const CustomButton = ({ onClick, children, variant = "default", className = "" }) => {
  const baseStyles = "px-2 py-2 rounded-lg font-medium transition duration-300";
  const variants = {
    default: "bg-Nblue text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
    link: "text-blue-500 underline hover:text-blue-700",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default CustomButton;
