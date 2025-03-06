import React from "react";
import towel from "../../assets/utils/towel.jpg";

function TowelButton() {
  return (
    <button
      className="relative px-10 py-6 text-white text-lg font-semibold rounded-lg shadow-lg"
      style={{
        backgroundImage: `url(${towel})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-position 0.3s ease-in-out",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundPosition = "top left")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundPosition = "center")
      }
    >
      <span className="relative z-10 text-white text-lg font-bold drop-shadow-[4px_4px_10px_black]">
        Замовити послугу
      </span>
      <div className="absolute inset-0 bg-black opacity-5 rounded-lg"></div>
    </button>
  );
}

export default TowelButton;
