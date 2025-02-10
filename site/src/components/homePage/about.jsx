import React from "react";
import backScroll from "../../assets/home/backScroll.jpg";

function About() {
  return (
    <div className="relative w-full h-screen">
      {/* Фонове зображення */}
      <img
        src={backScroll}
        alt="Background"
        className="w-full h-full object-cover"
      />

      {/* Затемнення */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Контент */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-6">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-5xl font-extrabold mb-6 uppercase tracking-wide">
            Прано – преміум пральня доступна кожному
          </h1>

          <p className="text-lg mb-6 leading-relaxed text-gray-300">
            Ми дбаємо про вашу чистоту та комфорт, використовуючи передові
            технології прання, сушіння та хімчистки. Безпека та якість – наші
            пріоритети!
          </p>

          <div className="border-t border-gray-500 w-20 mx-auto my-6"></div>
          <div className="border-t border-gray-500 w-20 mx-auto my-6"></div>

          <h2 className="text-3xl font-semibold mt-6 mb-4">
            Висока якість послуг
          </h2>
          <p className="text-lg leading-relaxed text-gray-300">
            Ми використовуємо лише професійне обладнання, яке дбайливо очищує
            навіть найделікатніші тканини. Контроль кожного етапу гарантує
            бездоганний результат для кожного клієнта.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
