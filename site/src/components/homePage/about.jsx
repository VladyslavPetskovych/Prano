import React from "react";
import backScroll from "../../assets/home/backScroll.jpg";
import TowelButton from "../utils/towelButton";

function About() {
  const values = [
    {
      title: "1. Турбота — в кожному русі",
      description:
        "Ми ставимось до речей з тією ж ніжністю, з якою ви вибирали їх улюбленими. Для нас кожен піджак, кожна сукня чи пара взуття — це не просто матеріал, а історія, спогади, стиль.",
    },
    {
      title: "2. Професійність — наш щоденний стандарт",
      description:
        "Ми обираємо найкраще обладнання, інноваційні засоби й постійно навчаємо команду. Кожне рішення — зважене, кожна дія — точна.",
    },
    {
      title: "3. Естетика і деталізація",
      description:
        "Ми не просто чистимо — ми відновлюємо форму, підсилюємо вигляд, зберігаємо лінії. Ви отримаєте річ такою, якою вона мала би бути з самого початку — або навіть краще.",
    },
    {
      title: "4. Довіра — наш головний здобуток",
      description:
        "Відкритість, чесність і безкомпромісна якість — наші пріоритети. Ми завжди робимо більше, ніж ви очікуєте.",
    },
    {
      title: "5. Розвиток — це наш стиль життя",
      description:
        "Ми вдосконалюємо наші послуги, слідкуємо за міжнародними тенденціями й впроваджуємо нові методи. Ваші речі заслуговують на найкраще.",
    },
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image */}
      <img
        src={backScroll}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto">
        <div className="bg-black/70 backdrop-blur-md rounded-3xl shadow-2xl px-6 sm:px-10 py-12 space-y-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
            Наші Цінності
          </h2>

          <div className="space-y-8">
            {values.map((value, index) => (
              <div key={index} className="group transition duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-Nblue group-hover:text-cyan-300 transition">
                  {value.title}
                </h3>
                <p className="mt-2 text-gray-100 text-base leading-relaxed">
                  {value.description}
                </p>
                <div className="mt-4 h-[1px] w-full bg-gray-700 group-hover:bg-cyan-400 transition-all duration-300" />
              </div>
            ))}
          </div>

          <div className="pt-6 flex justify-center">
            <TowelButton />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
