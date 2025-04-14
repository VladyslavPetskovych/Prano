import React from "react";
import dryCleaningg from "../../assets/service/dryCleaningg.jpg";
import twoPeople from "../../assets/videos/twoPeople.mp4";

function DryCleaning() {
  return (
    <section className="py-6 mx-6 rounded-md bg-gray-50  shadow-xl">
      {/* Video + Content in same row for md and up */}
      <h2 className="text-4xl mx-auto font-extrabold text-gray-800 tracking-wide text-center mb-5">
        Хімчистка
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-1 mb-8 font-condensed ">
        {/* Video */}
        <div className="w-full md:w-1/2 overflow-hidden rounded-xl  shadow-xl">
          <video
            src={twoPeople}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 bg-white rounded-3xl overflow-hidden flex flex-col justify-center p-8 space-y-6">
          <p className="text-lg md:text-2xl text-gray-600 leading-relaxed">
            Професійна хімчистка – це безпечний та ефективний спосіб видалення
            складних забруднень без пошкодження тканин. Ми використовуємо
            сучасні технології та екологічно чисті засоби для досягнення
            ідеального результату.
          </p>
          <ul className="space-y-4 text-gray-700 text-lg">
            {[
              "Делікатне очищення дорогих тканин",
              "Видалення плям без пошкодження матеріалу",
              "Безпечні та гіпоалергенні засоби",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <svg
                  className="w-6 h-6 mt-1 text-blue-600 flex-shrink-0"
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
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Image below */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6">
        {/* Text */}
        <div className="w-full md:w-1/2">
          <p className="text-lg text-gray-600 leading-relaxed md:text-2xl font-condensed ">
            Ми беремо на себе відповідальність за чистоту Ваших речей. Беремося
            навіть за найскладніші плями, і будемо тримати Вас в курсі кожної
            процедури. При складних забрудненнях, ми зателефонуємо до Вас
            узгодити, які речовини будуть використанні, і які можливі наслідки
            залишаться на одязі.
          </p>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src={dryCleaningg}
            alt="Dry cleaning process"
            className="w-full max-h-96 rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

export default DryCleaning;
