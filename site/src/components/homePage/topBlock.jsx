import { useState } from "react";
import pranoVideo from "../../assets/videos/Prano Small Video(1).mp4";
import back from "../../assets/home/back.png";
import logo from "../../assets/logo/pranoTextGold.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {QuickOrderModal} from "../quickOrderModal/index.js";


const TopBlock = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className="relative h-[900px] w-full flex flex-col items-center justify-center overflow-hidden font-manrope bg-Ndark">
      {/* Постер-зображення — показується миттєво, поки відео не готове */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      <video
        src={pranoVideo}
        poster={back}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoReady(true)}
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>

      <div className="relative z-10 text-center px-6">
        <img src={logo} alt="" className="w-64 md:w-96 mx-auto" />

        <p className="md:text-2xl text-xl  font-bold text-white mt-4 max-w-2xl mx-auto leading-relaxed shadow-md p-2 bg-opacity-20 bg-black rounded-2xl">
          Хімчистка одягу, прання, реставрація сумок і взуття у Львові. Преміум-послуги для вашого комфорту та стилю.
        </p>

        <button
          onClick={() => {
              if (isAuth) {
                window.location.href = "/account"
              } else {
                setIsQuickOpen(true)
              }
          }}
          className="mt-6 inline-block font-bold bg-Ndark bg-opacity-80 text-white text-lg py-3 px-8 rounded-lg shadow-lg hover:bg-[#c4a75c] transition duration-300"
          style={{
            textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Замовити послугу
        </button>

          {!isAuth && isQuickOpen &&
            <QuickOrderModal onClose={() => setIsQuickOpen(false)}/>
          }
      </div>
    </div>
  );
};

export { TopBlock };
