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
      "Костюми, коктейльні сукні, піджаки, шарфи, вечірні сорочки, вишукані блузи... BLANC дбає про ваші найделікатніші речі. Ми використовуємо експертну нетоксичну альтернативу хімчистці, яка забезпечує якісніше очищення.",
    image: dry,
  },
  {
    title: "Ремонт та підшивка",
    description:
      "Перешивання ґудзиків, вкорочення штанів, ушивання сукні або підгонка довжини піджака? Ми надаємо зручний і якісний сервіс з ремонту та підшивки одягу, щоб задовольнити всі ваші потреби.",
    image: sewing,
  },
  {
    title: "Прання та складання білизни",
    description:
      "Чому б не викреслити прання зі свого списку справ і не довірити його нам? Ми також пропонуємо зручну послугу 'Прання та складання'. Ми перемо ваш одяг за допомогою екологічних миючих засобів, сушимо та акуратно складаємо.",
    image: laundry,
  },
  {
    title: "Послуги з прасування сорочок",
    description:
      "Ідеально випрасувані або накрохмалені сорочки – наш якісний ручний підхід гарантує, що ви завжди виглядатимете бездоганно.",
    image: shirt,
  },
  {
    title: "Домашній текстиль",
    description:
      "Постільна білизна, ковдри, подушки, м'які меблі, штори – ми допоможемо зберегти ваш домашній текстиль свіжим і чистим.",
    image: bedding,
  },
  {
    title: "Догляд за шкірою та замшею",
    description:
      "Потрібно почистити шкіряне взуття або куртку? Ви можете довірити нам правильний догляд за ними.",
    image: leather,
  },
];

function priceGrid() {
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
                <button className="mt-4 border border-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white transition">
                  Дізнатись більше
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default priceGrid;
