import React from "react";
import grid1 from "../../assets/fur/grid1.jpg";
import grid2 from "../../assets/fur/grid2.jpg";
import grid3 from "../../assets/fur/grid3.jpg";
import grid4 from "../../assets/fur/grid4.jpg";
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
      img: grid3,
      header: "Індивідуальне перешивання хутра",
      description:
        "Перетворюємо застарілі хутряні вироби на сучасні стилі завдяки майстерному крою.",
    },
    {
      id: 4,
      img: grid4,
      header: "Професійне зберігання хутра",
      description:
        "Захистіть хутряні вироби в умовах оптимального мікроклімату під час теплих місяців.",
    },
    {
      id: 5,
      img: grid5,
      header: "Професійні зміни фасону",
      description:
        "Ідеальна посадка та стиль вашого хутра завдяки нашим послугам з підгонки.",
    },
    {
      id: 6,
      img: grid6,
      header: "Реставрація вінтажного хутра",
      description:
        "Оновлюємо старовинні хутряні речі, зберігаючи їхню унікальність та історію.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-16 bg-Ngold text-white">
      <h2 className="text-4xl font-bold text-center mb-16 tracking-tight text-Ndark drop-shadow-md">
        Наші Послуги
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card) => (
          <div key={card.id} className="flex flex-col items-start group">
            <img
              src={card.img}
              alt={card.header}
              className="w-full h-72 rounded-2xl object-cover mb-6 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <h3 className="text-2xl font-semibold mb-3 text-Ndark tracking-tight drop-shadow-sm group-hover:underline decoration-2 underline-offset-4 transition">
              {card.header}
            </h3>
            <p className="text-base text-Ndark leading-relaxed opacity-80 drop-shadow-sm">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBlock;
