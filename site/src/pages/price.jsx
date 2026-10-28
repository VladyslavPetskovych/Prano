import React from "react";
import { Link } from "react-router-dom";
import PriceTable from "../components/price/priceTable";
import PriceTopBlock from "../components/price/PriceTopBlock";
import Merchendise from "../components/price/merchendise";

// Тимчасово ховаємо прайс, поки оновлюємо ціни. Щоб повернути — поставити false.
const PRICES_DISABLED = true;

function PricesUnavailable() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-Ndark mb-4">
          Ведуться технічні роботи
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Ми оновлюємо прайс. Щоб дізнатися ціну, будь ласка, спитайте у менеджера.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+380771515111"
            className="bg-Ndark text-white font-semibold px-6 py-3 rounded-lg hover:bg-Ngold hover:text-Ndark transition"
          >
            Зателефонувати: +38 077 151 51 11
          </a>
          <a
            href="https://t.me/Prano_Lviv_bot"
            target="_blank"
            rel="noreferrer"
            className="border border-Ndark text-Ndark px-6 py-3 rounded-lg hover:bg-Ndark hover:text-white transition"
          >
            Написати в Telegram
          </a>
        </div>
        <Link to="/contacts" className="inline-block mt-6 text-Nblue underline">
          Пункти прийому та контакти
        </Link>
      </div>
    </div>
  );
}

function Price() {
  if (PRICES_DISABLED) {
    return <PricesUnavailable />;
  }

  return (
    <div className="pt-10 bg-white bg-opacity-70">
      {/* <PriceTopBlock /> */}
      <div className="lg:mx-20 mx-3  rounded-xl">
        {/* <PriceTable /> */}
        <Merchendise />
      </div>
    </div>
  );
}

export default Price;
