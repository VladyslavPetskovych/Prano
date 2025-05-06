import React from "react";
import weasel from "../../assets/logo/laska.jpg";

const AboutUs = () => {
  return (
    <div className=" bg-black text-white ">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-16">
        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prano — це більше, ніж хімчистка.
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Це турбота, досвід і любов до деталей. Наша історія почалась у 2020
            році зі звичайної пральні. Та з часом ми зрозуміли: хочемо більше.
            Більше якості, більше професійності, більше довіри. Так з’явилася
            Prano — преміум хімчистка, створена на основі практичного досвіду і
            щирого бажання робити послуги з догляду за речами справді
            бездоганними.
            <br />
          </p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-4xl font-bold text-white mb-6">Наше бачення</h2>
          <p className="text-gray-300 leading-relaxed">
            Сьогодні наша команда — це досвідчені технологи, уважні майстри з
            реставрації взуття, фахівці, які знають, як зберегти форму пальта чи
            повернути життя улюбленій сумці. Ми працюємо з одягом, взуттям,
            аксесуарами — і робимо це з повагою та професійністю. Prano — це
            коли речі отримують друге життя, а клієнти — сервіс, що залишає
            після себе вау-ефект.
          </p>
        </div>
      </div>
      <section className="md:py-16 py-3 px-4 md:px-32 flex flex-col lg:flex-row text-center items-center gap-8 bg-Ndark">
        <div className="text-white max-w-2xl">
          <h2
            className="text-lg font-semibold leading-relaxed"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            На нашому логотипі – ласка, або горностай. Це не просто мила
            тваринка родини куницевих. Це – символ, у якому ми впізнали себе.
            Ласка – неймовірно охайна. Хутро — це її багатство. Ласка настільки
            чистолюбна, що, опинившись перед вибором – забруднитися або ж
            потрапити у неволю чи стати здобиччю, обирає клітку, аби лише
            зберегти свій бездоганний вигляд. Ці витонченість і принциповість
            нам дуже близькі. Як і ласка, дбаємо про чистоту — не лише речей, а
            й шліфуємо свій підхід до роботи. У кожній деталі, в кожному русі
            нашої команди – повага до чистоти, до форми, до вас. Prano — як
            ласка. Обирає чистоту без компромісів
          </h2>
        </div>
        <img
          src={weasel}
          alt="Weasel"
          className="w-72 md:w-96 object-contain rounded-full hover:scale-105 transition-transform duration-300"
        />
      </section>
    </div>
  );
};

export default AboutUs;
