import React from "react";
import grid1 from "../../assets/textile/grid1.jpg";
import grid2 from "../../assets/textile/grid2.jpg";
import grid3 from "../../assets/textile/grid3.jpg";
import grid4 from "../../assets/textile/grid4.jpg";
import grid5 from "../../assets/textile/grid5.jpeg";
import grid6 from "../../assets/textile/grid6.jpeg";
import log from "../../assets/logo/CatLogoDark.svg";

const GridBlock = () => {
  const cards = [
    {
      id: 1,
      img: grid1,
      header: "Хімчистка текстилю",
      description:
        "Професійне очищення одягу та домашнього текстилю з використанням безпечних технологій та делікатного підходу.",
    },
    {
      id: 2,
      img: grid2,
      header: "Ремонт та латання одягу",
      description:
        "Відновлення пошкоджень, заміна блискавок, ґудзиків і підгин штанів або рукавів – для бездоганного вигляду.",
    },
    {
      id: 3,
      img: grid3,
      header: "Зберігання сезонного текстилю",
      description:
        "Створюємо одяг на замовлення з урахуванням вашого стилю та ідеальної посадки.",
    },
    {
      id: 4,
      img: grid4,
      header: " Індивідуальне пошиття",
      description:
        "Безпечне зберігання одягу, постелі чи інших виробів у контрольованих умовах протягом міжсезоння.",
    },
    {
      id: 5,
      img: grid5,
      header: "Фарбування тканин",
      description:
        "Оновлення кольору або повна зміна відтінку текстильних виробів без шкоди для матеріалу.",
    },
    {
      id: 6,
      img: grid6,
      header: "Реставрація та відновлення тканин",
      description:
        "Оновлення старого або пошкодженого текстилю: перешивання, заміна підкладки, зміцнення тканин.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 bg-Nblue text-white">
      <div className="flex flex-row items-center justify-center mb-8">
        <h2
          className="text-xl md:text-3xl font-bold text-center  tracking-tight text-white drop-shadow-md"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Наші послуги по догляду за текстилем
        </h2>
        <img src={log} alt="" className="w-32 mx-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-start group bg-Ndark p-4 rounded-2xl shadow-lg transition-transform hover:-translate-y-1"
          >
            <img
              src={card.img}
              alt={card.header}
              className="w-full h-72 rounded-xl object-cover mb-6 shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-3 text-white tracking-tight group-hover:text-Ngold transition">
              {card.header}
            </h3>
            <p className="text-base text-white/80 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBlock;
