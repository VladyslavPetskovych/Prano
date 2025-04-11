import React from "react";
import { Calendar, Shirt, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar size={60} className="text-slate-500" />,
      title: "Запис",
      description:
        "Замовте збір і доставку через наш додаток або залиште речі в магазині. Ви також можете надіслати їх через наш LIVE CHAT бот!",
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
        "Ми повернемо ваші речі протягом 3 робочих днів кур'єрською доставкою або ви можете забрати їх у магазині. Доступні експрес-послуги.",
    },
  ];

  return (
    <div className="w-full py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold font-roboto text-gray-800 mb-8">Як це працює ?</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center max-w-sm text-center">
            <div className="p-6 bg-white rounded-full shadow-lg mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold">{index + 1}. {step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
