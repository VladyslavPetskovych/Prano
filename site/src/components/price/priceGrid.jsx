import React from "react";
import dry from "../../assets/price/drycleaning.jpg";
import sewing from "../../assets/price/sewing.jpg";
import laundry from "../../assets/price/laundry.jpg";
import shirt from "../../assets/price/shirt.jpg";
import bedding from "../../assets/price/bedding.jpg";
import leather from "../../assets/price/leather.jpg";

const services = [
  {
    title: "Хімчистка",
    description:
      "Костюми, коктейльні сукні, піджаки, шарфи, вечірні сорочки, вишукані блузи... BLANC дбає про ваші найделікатніші речі.",
    image: dry,
    price: "від 250 грн",
  },
  {
    title: "Ремонт та підшивка",
    description:
      "Перешивання ґудзиків, вкорочення штанів, ушивання сукні або підгонка довжини піджака?",
    image: sewing,
    price: "від 150 грн",
  },
  {
    title: "Прання та складання білизни",
    description:
      "Чому б не викреслити прання зі свого списку справ і не довірити його нам? Ми використовуємо екологічні миючі засоби.",
    image: laundry,
    price: "від 100 грн",
  },
  {
    title: "Послуги з прасування сорочок",
    description:
      "Ідеально випрасувані або накрохмалені сорочки – наш якісний ручний підхід гарантує, що ви завжди виглядатимете бездоганно.",
    image: shirt,
    price: "від 80 грн",
  },
  {
    title: "Домашній текстиль",
    description:
      "Постільна білизна, ковдри, подушки, м'які меблі, штори – ми допоможемо зберегти ваш домашній текстиль свіжим і чистим.",
    image: bedding,
    price: "від 200 грн",
  },
  {
    title: "Догляд за шкірою та замшею",
    description:
      "Потрібно почистити шкіряне взуття або куртку? Ви можете довірити нам правильний догляд за ними.",
    image: leather,
    price: "від 300 грн",
  },
];

function PriceGrid() {
  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-600 mt-2 text-sm flex-grow">
                  {service.description}
                </p>
                <div className="mt-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
                  {service.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceGrid;
