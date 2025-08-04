import { useState, useEffect } from "react";
import back from "../../assets/home/back.webp";
import logo from "../../assets/logo/pranoTextGold.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


const TopBlock = () => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const img = new Image();
    img.src = back;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="relative h-[900px] w-full flex flex-col items-center justify-center overflow-hidden font-manrope">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      {!bgLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

      <div className="relative z-10 text-center px-6">
        <img src={logo} alt="" className="w-64 md:w-96 mx-auto" />

        <p className="md:text-2xl text-xl  font-bold text-white mt-4 max-w-2xl mx-auto leading-relaxed shadow-md p-2 bg-opacity-20 bg-black rounded-2xl">
          Хімчистка одягу, прання, реставрація сумок і взуття у Львові. Преміум-послуги для вашого комфорту та стилю.
        </p>

        <Link
          to={isAuth ? "/account" : "/login"}
          className="mt-6 inline-block font-bold bg-Ndark bg-opacity-80 text-white text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-[#c4a75c] transition duration-300"
          style={{
            textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Замовити послугу
        </Link>
      </div>
    </div>
  );
};

export { TopBlock };
