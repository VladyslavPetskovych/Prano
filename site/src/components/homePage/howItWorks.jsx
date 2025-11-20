import React from "react";
import { Calendar, Shirt, Truck } from "lucide-react";

// ✅ Import banners
import pranoDesk from "../../assets/temp/pranoDesk.jpg";
import pranoMOB from "../../assets/temp/pranoMOB.png";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar size={60} className="text-slate-500" />,
      title: "Запис",
      description:
        "Зробіть замовлення через наш сайт або залиште речі в пункті прийому. Ми пояснимо, як все працює, і підберемо оптимальний варіант для вас.",
    },
    {
      icon: <Shirt size={60} className="text-slate-500" />,
      title: "Чистка",
      description:
        "Усі отримані речі проходять індивідуальну перевірку, чистку та контроль якості на найвищому рівні. Доступні також послуги з ремонту одягу.",
    },
    {
      icon: <Truck size={60} className="text-slate-500" />,
      title: "Доставка",
      description:
        "Ми повернемо ваші речі протягом 5 робочих днів кур'єрською доставкою або ви можете забрати їх у пунктах прийому. Доступні експрес-послуги.",
    },
  ];

  return (
    <div className="w-full">
      {/* 🖼️ Banner Section */}
      {/*<div className="relative w-full">*/}
      {/*  /!* Desktop banner *!/*/}
      {/*  <img*/}
      {/*    src={pranoDesk}*/}
      {/*    alt="Banner Desktop"*/}
      {/*    className="hidden sm:block w-full h-auto object-cover"*/}
      {/*  />*/}
      {/*  /!* Mobile banner *!/*/}
      {/*  <img*/}
      {/*    src={pranoMOB}*/}
      {/*    alt="Banner Mobile"*/}
      {/*    className="block sm:hidden w-full h-auto object-cover"*/}
      {/*  />*/}
      {/*</div>*/}

      {/* Content Section */}
      <div className="w-full py-12 bg-gray-100 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-center font-tinos text-Ndark relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
          Як це працює ?
        </h2>

        <div className="flex flex-col md:flex-row justify-center items-center font-manrope gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center max-w-sm text-center"
            >
              <div className="p-6 bg-white rounded-full shadow-lg mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-extrabold text-Ndark">
                {index + 1}. {step.title}
              </h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
