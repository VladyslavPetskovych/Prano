import React from "react";
import furtop from "../../assets/fur/toppart.jpg";
import CatLogo from "../../assets/logo/CatLogoGold.svg";
import weasel from "../../assets/logo/laska.jpg";
import furCoat from "../../assets/fur/furCoat.jpg";
import furTX from "../../assets/fur/furTexture.jpg";

function TopBlock() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="py-12 px-2 md:px-8 text-center bg-Ndark">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">
          <h1
            className="text-4xl md:text-6xl font-bold text-white"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            Збережемо елегантність вашого хутра
          </h1>
          <img src={CatLogo} alt="Cat Logo" className="w-24 md:w-32" />
        </div>

        <p
          className="text-lg md:text-xl text-white max-w-2xl mx-auto mt-6"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Забезпечте бездоганний вигляд і розкіш хутра з професійним доглядом
          від Prano у Львові.
        </p>
      </section>

      {/* Images Grid */}
      <section className="py-12 px-4 md:px-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-[70vh]">
          <img
            src={furCoat}
            alt="Fur Coat"
            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col md:h-[70vh]  gap-4">
          <img
            src={furtop}
            alt="Fur Texture Top"
            className="hidden md:block w-full h-1/2 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
          <img
            src={furTX}
            alt="Fur Texture Close"
            className="hidden md:block w-full h-1/2 object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Info Section */}
      <section className="md:py-16 py-3 px-4 md:px-32 flex flex-col lg:flex-row text-center items-center gap-8 bg-Ndark">
        <div className="text-white max-w-2xl">
          <h2
            className="text-lg  md:text-xl font-semibold leading-relaxed"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            Відкрийте для себе неперевершену турботу про свій хутряний одяг у
            Prano, провідному львівському сервісі догляду за хутряним одягом. Ми
            пропонуємо професійні рішення для чищення, ремонту та зберігання,
            розроблені для збереження елегантності та довговічності ваших цінних
            речей. Довіртеся нашій майстерності та відданості справі, елегантне
            збереження краси вашої колекції хутра.
          </h2>
        </div>
        <img
          src={weasel}
          alt="Weasel"
          className="w-72 md:w-96 object-contain rounded-full hover:scale-105 transition-transform duration-300"
        />
      </section>
    </div>
  );
}

export default TopBlock;
