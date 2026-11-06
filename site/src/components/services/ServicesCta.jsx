import React from "react";
import { Link } from "react-router-dom";
import { BUTTON_LIGHT } from "./buttons";

function ServicesCta() {
  return (
    <section className="bg-Ndark text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center md:px-8 md:py-20">
        <h2 className="font-playfair text-3xl font-normal md:text-4xl">
          Маєте особливу річ?
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-manrope leading-relaxed text-white/70">
          Зателефонуйте нам — технолог підкаже, як найкраще доглянути або
          відновити ваш виріб, і зорієнтує щодо вартості та термінів.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="tel:+380771515111" className={BUTTON_LIGHT}>
            +380 77 151 5111
          </a>
          <Link to="/premium" className={BUTTON_LIGHT}>
            Prano Premium
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServicesCta;
