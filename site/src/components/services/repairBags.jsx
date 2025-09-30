import React from "react";
import purse from "../../assets/service/purse.webp";

function BagRestoration() {
  return (
    <section
      id="repair-bags"
      className=" mx-6 md:mx-auto max-w-6xl font-manrope py-20"
    >
      {/* Верхній блок з фото та описом */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-pureWhite rounded-3xl overflow-hidden shadow-xl border border-lightGray">
        {/* Фото */}
        <div className="relative">
          <img
            src={purse}
            alt="Реставрація сумок та аксесуарів"
            className="w-full h-[280px] md:h-[320px] object-cover brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Текст */}
        <div className="p-6 md:p-8 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-Ndark mb-4">
            Реставрація сумок та аксесуарів
          </h2>
          <p className="text-base md:text-lg text-logoGray leading-relaxed">
            Повертаємо життя вашим улюбленим виробам: гаманцям, сумкам, ременям.
            Виконуємо професійний догляд та реставрацію у форматі{" "}
            <span className="font-semibold text-Ndark">Стандарт</span> або{" "}
            <span className="font-semibold text-Ndark">Преміум</span>, щоб ви
            отримали результат, який відповідає вашим очікуванням.
          </p>
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
            Реставрація сумок за доглядом «Стандарт» охоплює:
          </p>
          <ul className="space-y-2 text-Ndark text-lg">
            <li>• Чистку внутрішню і зовнішню</li>
            <li>• Відновлення кольору</li>
            <li>• Усунення дрібних подряпин</li>
          </ul>
        </div>

        {/* Преміум */}
        <div className="relative bg-Ndark text-pureWhite rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-8 flex flex-col">
          <div className="absolute top-0 left-0 w-full h-2 bg-Ngold rounded-t-2xl"></div>
          <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-pureWhite mb-5 text-center md:text-left">
            Преміум
          </h3>
          <p className="text-lightGray text-lg mb-4">
            За доглядом «Преміум» реставрація сумок охоплює:
          </p>
          <ul className="space-y-2 text-pureWhite text-lg">
            <li>• Чистку внутрішню і зовнішню</li>
            <li>• Насичення кольором</li>
            <li>• Відновлення урізів</li>
            <li>• Дезінфекцію підкладки</li>
            <li>• Покриття виробу водовідштовхувальним спреєм</li>
            <li>• Дрібний поточний ремонт</li>
            <li>• Роботу особисто головного технолога</li>
            <li>• Окреме виконання від інших замовлень</li>
            <li>• Консультацію технолога</li>
          </ul>
        </div>
      </div>

      {/* Додатковий блок */}
      
    </section>
  );
}

export default BagRestoration;
