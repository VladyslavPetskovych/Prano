import React from "react";
import dryCleaningg from "../../assets/service/dryCleaningg.jpg";
import twoPeople from "../../assets/videos/twoPeople.mp4";

function DryCleaning() {
  return (
    <section
      id="dry-cleaning"
      className="py-16 pt-4 mx-6 md:mx-auto max-w-6xl font-manrope"
    >
      {/* Верхній блок з відео та описом */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-pureWhite rounded-t-3xl overflow-hidden shadow-xl border border-lightGray">
        {/* Відео */}
        <div className="relative">
          <video
            src={twoPeople}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[280px] md:h-[320px] object-cover brightness-95"
          />
        </div>

        {/* Текст */}
        <div className="p-6 md:p-6 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-Ndark mb-4">
            Хімчистка одягу
          </h2>
          <p className="text-base md:text-lg text-logoGray leading-relaxed">
            Дбайлива професійна чистка будь-яких речей з урахуванням маркування
            та типу тканини. Ми працюємо у форматі{" "}
            <span className="font-semibold text-Ndark">Стандарт</span> або{" "}
            <span className="font-semibold text-Ndark">Преміум</span>, щоб ви
            отримали бездоганний результат і впевненість у чистоті.
          </p>
        </div>
      </div>

      {/* ↓ Забрали mt-10 ↓ */}
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Текст */}
        <div className="bg-pureWhite  border border-lightGray p-8 shadow-md flex items-center">
          <p className="text-lg text-logoGray leading-relaxed">
            Ми бережно працюємо з найніжнішими тканинами. Усі речі проходять
            відпарювання, прасування та пакуються з максимальною увагою до
            деталей, щоб ви отримали ідеально підготовлений виріб.
          </p>
        </div>

        {/* Фото */}
        <div className="relative">
          <img
            src={dryCleaningg}
            alt="Процес хімчистки одягу"
            className="w-full h-[280px] md:h-[320px] object-cover  shadow-xl brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Блоки Стандарт / Преміум */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Стандарт */}
        <div className="relative bg-pureWhite rounded-2xl border border-lightGray shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-Nblue rounded-t-2xl"></div>
          <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-Ndark mb-5 text-center md:text-left">
            Стандарт
          </h3>
          <p className="text-logoGray text-lg mb-4">
            У хімчистку одягу за доглядом «Стандарт» входить:
          </p>
          <ul className="space-y-2 text-Ndark text-lg">
            <li>• Робота плямовивідника під наглядом технолога</li>
            <li>• Підготовка виробу до чистки згідно з маркуванням</li>
            <li>• Виведення плям та зачистка</li>
            <li>• Безпосередньо чистка</li>
            <li>• Прасування і пакування виробу</li>
          </ul>
        </div>

        {/* Преміум */}
        <div className="relative bg-Ndark text-pureWhite rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-Ngold rounded-t-2xl"></div>
          <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-pureWhite mb-5 text-center md:text-left">
            Преміум
          </h3>
          <p className="text-lightGray text-lg mb-4">
            У хімчистку одягу за доглядом «Преміум» входить:
          </p>
          <ul className="space-y-2 text-pureWhite text-lg">
            <li>• Особиста робота технолога окремо від інших замовлень</li>
            <li>• Виведення плям та зачистка виробу</li>
            <li>• Безпосередньо чистка</li>
            <li>• Дрібний ручний ремонт</li>
            <li>• Зняття ковтунців</li>
            <li>• Консультація головного технолога (за потреби)</li>
            <li>• Прасування та пакування виробу</li>
          </ul>
        </div>
      </div>

      {/* Додатковий блок з фото */}
    </section>
  );
}

export default DryCleaning;
