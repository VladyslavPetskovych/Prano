import React from "react";
import { Helmet } from "react-helmet";
import grid1 from "../../assets/fur/grid1.jpg";
import grid2 from "../../assets/fur/grid2.jpg";
import grid5 from "../../assets/fur/grid5.jpg";
import grid6 from "../../assets/fur/grid6.jpg";

const GridBlock = () => {
  const cards = [
    {
      id: 1,
      img: grid1,
      header: "Професійне чищення хутра",
      description:
        "Оновіть вигляд вашого хутра за допомогою ретельного чищення, що забезпечує елегантність і довговічність.",
    },
    {
      id: 2,
      img: grid2,
      header: "Комплексний ремонт хутра",
      description:
        "Відновлюємо пошкодження з точністю, зберігаючи природну красу вашого хутра.",
    },
    {
      id: 3,
      img: grid5,
      header: "Професійні зміни фасону",
      description:
        "Ідеальна посадка та стиль вашого хутра завдяки нашим послугам з підгонки.",
    },
    {
      id: 4,
      img: grid6,
      header: "Реставрація вінтажного хутра",
      description:
        "Оновлюємо старовинні хутряні речі, зберігаючи їхню унікальність та історію.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 bg-Ngold text-white">
      <Helmet>
        <title>Наші послуги з догляду та ремонту хутра | FurCare</title>
        <meta
          name="description"
          content="Пропонуємо професійне чищення, ремонт, зміну фасону та реставрацію вінтажного хутра. Якість, на яку ви можете покластися."
        />
        <meta
          name="keywords"
          content="чищення хутра, ремонт хутра, реставрація хутра, зміна фасону, догляд за хутром"
        />
        <meta name="author" content="FurCare" />
        <meta
          property="og:title"
          content="Наші послуги з догляду та ремонту хутра | FurCare"
        />
        <meta
          property="og:description"
          content="Професійні послуги з чищення, ремонту та реставрації хутряних виробів."
        />
        <meta property="og:image" content={grid1} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
      </Helmet>

      <h2
        className="text-4xl font-bold text-center mb-16 tracking-tight text-white drop-shadow-md"
        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
      >
        Наші Послуги
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-start group bg-Ndark p-3 rounded-2xl"
          >
            <img
              src={card.img}
              alt={card.header}
              className="w-full h-72 rounded-2xl object-cover mb-6 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-3 text-white tracking-tight drop-shadow-sm group-hover:underline decoration-2 underline-offset-4 transition">
              {card.header}
            </h3>
            <p className="text-base text-white leading-relaxed opacity-80 drop-shadow-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBlock;
