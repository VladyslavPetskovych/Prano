import React from "react";
import { Link } from "react-router-dom";
import { BUTTON_LIGHT } from "./buttons";

function ServicesHero() {
  return (
    <header className="bg-Ndark text-white pt-36 pb-16 md:pt-44 md:pb-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h1 className="font-playfair text-5xl font-normal md:text-6xl">
          Наші послуги
        </h1>
        <p className="mt-6 max-w-xl font-manrope text-base leading-relaxed text-white/70 md:text-lg">
          Кожну річ оглядає технолог і підбирає безпечний метод чистки чи
          реставрації. Ваші речі отримують преміальний догляд — з увагою до
          кожної деталі.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/price" className={BUTTON_LIGHT}>
            Переглянути ціни
          </Link>
          <Link to="/contacts" className={BUTTON_LIGHT}>
            Пункти прийому
          </Link>
        </div>
      </div>
    </header>
  );
}

export default ServicesHero;
