import React from "react";
import dryCleaningg from "../../assets/service/dryCleaningg.jpg";
import twoPeople from "../../assets/videos/twoPeople.mp4";

function DryCleaning() {
  return (
    <section className="py-16 px-6 mx-6 md:px-12 rounded-2xl bg-gray-50 shadow-xl">
      <h2 className="text-4xl md:text-5xl mx-auto font-extrabold text-gray-800 tracking-wide text-center mb-12">
        Хімчистка одягу
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 mb-16">
        <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-xl">
          <video
            src={twoPeople}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-3xl flex flex-col justify-center p-8 md:p-10 space-y-8 shadow-lg">
          <p className="text-lg  text-gray-700 leading-relaxed">
            Чистка пальт, костюмів, суконь, верхнього одягу з індивідуальним
            підходом до кожного типу тканини. Усі речі проходять відпарювання,
            прасування та упаковуються з дбайливістю до кожної складки.
          </p>
          <ul className=" text-gray-800 text-lg">
            {[
              "Делікатне очищення дорогих тканин",
              "Видалення плям без пошкодження матеріалу",
              "Безпечні та гіпоалергенні засоби",
            ].map((item, index) => (
              <li key={index} className="flex items-start ">
                <svg
                  className="w-3 h-3 mt-2 mx-3 text-Ndark flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-left">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Second part of the section with text and image */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 h-[400px] overflow-hidden rounded-2xl shadow-xl">
          <div className="w-full h-full bg-white rounded-2xl p-8 md:p-10 flex items-center shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed">
              Ми беремо на себе відповідальність за чистоту Ваших речей.
              Беремося навіть за найскладніші плями, і будемо тримати Вас в
              курсі кожної процедури. При складних забрудненнях ми зателефонуємо
              до Вас узгодити, які речовини будуть використані, і які можливі
              наслідки залишаться на одязі.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-[400px] overflow-hidden rounded-2xl shadow-xl">
          <img
            src={dryCleaningg}
            alt="Dry cleaning process"
            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default DryCleaning;
