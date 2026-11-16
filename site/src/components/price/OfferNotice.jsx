import React from "react";
import { Link } from "react-router-dom";
import { FiFileText, FiArrowRight, FiCheck } from "react-icons/fi";
import { OFFER_HIGHLIGHTS } from "../../pages/offer/offerData";

// Блок під прайсом: нагадування, що замовлення оформлюється за умовами публічної оферти
export default function OfferNotice() {
  return (
    <div className="max-w-6xl mx-auto px-1 pt-10 pb-12">
      <div className="rounded-2xl bg-Ndark text-white overflow-hidden shadow-md">
        <div className="flex flex-col md:flex-row md:items-center gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-start gap-4 flex-1">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-Ngold/15 text-Ngold text-xl">
              <FiFileText />
            </span>
            <div>
              <p className="font-semibold text-base sm:text-lg">
                Ціни та умови обслуговування
              </p>
              <p className="text-sm text-white/70 mt-1">
                Оформлюючи замовлення, ви погоджуєтесь з умовами{" "}
                <Link to="/public-offer" className="text-Ngold hover:underline">
                  Договору публічної оферти
                </Link>
                .
              </p>
            </div>
          </div>
          <Link
            to="/public-offer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-Ngold text-Ndark font-semibold px-5 py-2.5 text-sm hover:bg-white transition shrink-0"
          >
            Читати договір <FiArrowRight />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 border-t border-white/10">
          {OFFER_HIGHLIGHTS.map((h, i) => (
            <Link
              key={h.section}
              to={`/public-offer#${h.section}`}
              className={`group flex gap-3 px-5 py-4 sm:px-6 hover:bg-white/5 transition ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l border-white/10" : ""
              }`}
            >
              <FiCheck className="mt-0.5 shrink-0 text-Ngold" />
              <div>
                <p className="text-sm font-semibold group-hover:text-Ngold transition">
                  {h.title}
                </p>
                <p className="text-xs text-white/60 mt-0.5 font-normal">{h.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
