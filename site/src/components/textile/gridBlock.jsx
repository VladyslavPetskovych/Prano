import React from "react";
import { Helmet } from "react-helmet";
import grid1 from "../../assets/textile/grid1.jpg";
import grid2 from "../../assets/textile/grid2.jpg";
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
      id: 5,
      img: grid5,
      header: "Відновлення тканин",
      description:
        "Оновлення кольору або повна зміна відтінку текстильних виробів без шкоди для матеріалу.",
    },
    {
      id: 6,
      img: grid6,
      header: "Реставрація  тканин",
      description:
        "Оновлення старого або пошкодженого текстилю: перешивання, заміна підкладки, зміцнення тканин.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 bg-Nblue text-white">
      <Helmet>
        <title>Професійний догляд за текстилем | TextileClean</title>
        <meta
          name="description"
          content="Хімчистка, ремонт, відновлення та реставрація одягу та домашнього текстилю. Якісні послуги з турботою про ваші речі."
        />
        <meta
          name="keywords"
          content="хімчистка текстилю, ремонт одягу, відновлення тканин, реставрація, текстиль, чистка одягу"
        />
        <meta name="author" content="TextileClean" />
        <meta
          property="og:title"
          content="Професійний догляд за текстилем | TextileClean"
        />
        <meta
          property="og:description"
          content="Замовляйте послуги з хімчистки, ремонту та реставрації текстилю з гарантією якості та безпечних технологій."
        />
        <meta property="og:image" content={grid1} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
      </Helmet>

      <div className="flex flex-col md:flex-row items-center justify-center mb-8">
        <h1
          className="text-white text-xl md:text-3xl font-extrabold tracking-wide after:content-[''] after:block after:w-32 after:h-1 after:mt-3 after:mx-auto after:bg-Ngold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          НАШІ ПОСЛУГИ ПО ДОГЛЯДУ ЗА ТЕКСТИЛЕМ
        </h1>
        <h2
          className="text-xl md:text-3xl font-bold text-center  tracking-tight text-white drop-shadow-md"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        ></h2>
        <img
          src={log}
          alt="Логотип компанії TextileClean"
          className="w-32 mx-9"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-start group bg-Ndark p-5 rounded-2xl shadow-lg transition-transform "
          >
            <img
              src={card.img}
              alt={card.header}
              className="w-full h-72 rounded-xl object-cover mb-6 shadow-md transition-transform duration-300 hover:scale-105"
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
