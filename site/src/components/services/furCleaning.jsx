import React from "react";
import furImage from "../../assets/service/fur.jpg";

function FurCleaning() {
  return (
    <section
      id="fur-cleaning"
      className="my-16 py-16 mx-6 md:mx-auto max-w-6xl font-manrope"
    >
      {/* Заголовок + фото */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-pureWhite rounded-3xl overflow-hidden shadow-xl border border-lightGray">
        {/* Фото */}
        <div className="relative">
          <img
            src={furImage}
            alt="Чистка натурального хутра"
            className="w-full h-full object-cover md:min-h-[500px] brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Текстова частина */}
        <div className="p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-Ndark mb-6">
            Чистка натурального хутра
          </h2>
          <p className="text-lg text-logoGray leading-relaxed">
            Оберіть догляд, що відповідає вашим потребам:{" "}
            <span className="text-Ndark font-semibold">Стандарт</span> або{" "}
            <span className="text-Ndark font-semibold">Преміум</span>. Кожен
            пакет включає професійний сервіс, що поверне вашому виробу свіжість
            та бездоганний вигляд.
          </p>
        </div>
      </div>

      {/* Блоки Стандарт / Преміум */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Стандарт */}
        <div className="relative bg-pureWhite rounded-2xl border border-lightGray shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-Nblue rounded-t-2xl"></div>
          <h3 className="text-3xl font-playfair font-semibold text-Ndark mb-5 text-center md:text-left">
            Стандарт
          </h3>
          <p className="text-logoGray text-lg mb-4">
            У чистку хутра за доглядом «Стандарт» входить:
          </p>
          <ul className="space-y-2 text-Ndark text-lg">
            <li>• Чистка виробу ззовні та зсередини</li>
            <li>• Усунення запахів</li>
          </ul>
        </div>

        {/* Преміум */}
        <div className="relative bg-Ndark text-pureWhite rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-Ngold rounded-t-2xl"></div>
          <h3 className="text-3xl font-playfair font-semibold text-pureWhite mb-5 text-center md:text-left">
            Преміум
          </h3>
          <p className="text-lightGray text-lg mb-4">
            За доглядом «Преміум» у чистку хутра входить:
          </p>
          <ul className="space-y-2 text-pureWhite text-lg">
            <li>• Чистка виробу ззовні та зсередини</li>
            <li>• Усунення запахів</li>
            <li>• Дрібний ремонт</li>
            <li>• Фарбування шкіряних вставок (за наявності)</li>
            <li>• Робота головного технолога особисто</li>
            <li>• Консультація та вужчі терміни виконання</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FurCleaning;
