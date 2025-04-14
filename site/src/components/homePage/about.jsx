import React from "react";
import backScroll from "../../assets/home/backScroll.jpg";
import TowelButton from "../utils/towelButton";

function About() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <img
        src={backScroll}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative text-white text-center px-6 max-w-3xl animate-fadeIn">
        <div className="bg-black/70 p-8 rounded-lg">
          <h1 className="text-lg md:text-2xl font-extrabold mb-4 uppercase tracking-wider drop-shadow-lg">
            Прано – преміум сервіс доступний кожному
          </h1>
          <p className="text-base md:text-lg mb-4 leading-relaxed text-gray-100 drop-shadow-lg">
            Ми дбаємо про вашу чистоту та комфорт, використовуючи передові
            технології прання, сушіння та хімчистки. Безпека та якість – наші
            пріоритети!
          </p>
          <TowelButton />
        </div>
      </div>
    </div>
  );
}

export default About;
