import { useState, useEffect } from "react";
import back from "../../assets/home/back.webp";

const TopBlock = () => {
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = back;
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <div className="relative h-[900px] w-full flex flex-col items-center justify-center overflow-hidden">
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
          Прано
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Ми пропонуємо високоякісні послуги прання та хімчистки, які
          забезпечать чистоту та свіжість вашого одягу. Дбайливий підхід до
          кожної речі — ваш одяг у надійних руках.
        </p>

        <a
          href="#services"
          className="mt-6 inline-block bg-[#d3b768] text-white text-lg font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#c4a75c] transition duration-300"
        >
          Замовити послугу
        </a>
     
      </div>
    </div>
  );
};

export { TopBlock };
