import React from "react";
import towel from "../../assets/utils/towel.jpg";

function TowelButton() {
  return (
    <button
      className="relative px-10 md:px-32 py-7 rounded-lg shadow-xl overflow-hidden"
      style={{
        backgroundImage: `url(${towel})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "transform 0.2s ease-in-out, filter 0.3s ease-in-out",
      }}
      onMouseEnter={(e) => {
      
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
 
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span className="relative z-10 text-white bg-Ndark rounded-xl px-4 text-base font-bold tracking-wide uppercase drop-shadow-[2px_2px_5px_rgba(0,0,0,0.7)]">
        Замовити послугу
      </span>

      <div className="absolute inset-0 bg-black opacity-25 rounded-lg backdrop-blur-sm"></div>
    </button>
  );
}

export default TowelButton;
