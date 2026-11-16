import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiFileText, FiChevronDown, FiArrowUp } from "react-icons/fi";
import {
  OFFER_SECTIONS,
  OFFER_REQUISITES,
  OFFER_EFFECTIVE_DATE,
} from "./offer/offerData";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function TocList({ activeId, onPick }) {
  return (
    <ol className="space-y-1 text-sm">
      {OFFER_SECTIONS.map((s) => (
        <li key={s.id}>
          <button
            type="button"
            onClick={() => onPick(s.id)}
            className={`w-full text-left flex gap-2 rounded-lg px-3 py-1.5 transition ${
              activeId === s.id
                ? "bg-Ngold/15 text-Ndark font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-Ndark"
            }`}
          >
            <span className="w-5 shrink-0 text-Ngold font-semibold">{s.n}.</span>
            <span>{s.title}</span>
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={() => onPick("requisites")}
          className={`w-full text-left flex gap-2 rounded-lg px-3 py-1.5 transition ${
            activeId === "requisites"
              ? "bg-Ngold/15 text-Ndark font-semibold"
              : "text-gray-600 hover:bg-gray-100 hover:text-Ndark"
          }`}
        >
          <span className="w-5 shrink-0 text-Ngold font-semibold">16.</span>
          <span>Реквізити Виконавця</span>
        </button>
      </li>
    </ol>
  );
}

function OfferItem({ item }) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <span className="shrink-0 w-11 pt-0.5 text-sm font-semibold text-Ngold tabular-nums">
        {item.n}
      </span>
      <div className="min-w-0">
        <p className="text-gray-800 leading-relaxed">{item.text}</p>
        {item.list && (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {item.list.map((li) => (
              <li
                key={li}
                className="flex gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-sm text-gray-700"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-Ngold" />
                <span>{li.replace(/[;.]$/, "")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PublicOffer() {
  const { hash } = useLocation();
  const [activeId, setActiveId] = useState(OFFER_SECTIONS[0].id);
  const [tocOpen, setTocOpen] = useState(false);

  // Перехід за посиланням із якорем (наприклад, /public-offer#payment)
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToSection(hash.slice(1)), 100);
    return () => clearTimeout(t);
  }, [hash]);

  // Підсвічування активного розділу у змісті
  useEffect(() => {
    const ids = [...OFFER_SECTIONS.map((s) => s.id), "requisites"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const pick = (id) => {
    setTocOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] pt-28 pb-16 font-manrope text-Ndark">
      {/* Шапка документа */}
      <header className="px-4 sm:px-6">
        <div className="max-w-6xl mx-auto rounded-3xl bg-Ndark text-white px-6 py-10 sm:px-12 sm:py-14 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-Ngold/10" />
          <div className="absolute right-24 -bottom-24 h-48 w-48 rounded-full bg-Ngold/5" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest text-Ngold">
              <FiFileText /> Публічна оферта
            </div>
            <h1 className="mt-5 text-3xl sm:text-5xl font-bold leading-tight">
              Договір публічної оферти
              <br />
              про надання послуг PRANO
            </h1>
            <p className="mt-4 max-w-2xl text-white/70 text-base sm:text-lg">
              Преміальна хімчистка, прання, ремонт та реставрація виробів
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/20 px-4 py-1.5">
                ТОВ «ПРАНО» · ЄДРПОУ 43828673
              </span>
              <span className="rounded-full border border-Ngold/50 text-Ngold px-4 py-1.5">
                Редакція чинна з {OFFER_EFFECTIVE_DATE}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 lg:mt-12 lg:grid lg:grid-cols-[280px_1fr] lg:gap-10">
        {/* Зміст: мобільний — розгортається, десктоп — липкий */}
        <aside className="mb-6 lg:mb-0">
          <div className="lg:hidden rounded-2xl bg-white border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => setTocOpen((v) => !v)}
              className="w-full flex items-center justify-between px-5 py-4 font-semibold"
            >
              Зміст договору
              <FiChevronDown
                className={`transition-transform ${tocOpen ? "rotate-180" : ""}`}
              />
            </button>
            {tocOpen && (
              <div className="px-2 pb-3">
                <TocList activeId={activeId} onPick={pick} />
              </div>
            )}
          </div>

          <div className="hidden lg:block sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl bg-white border border-gray-200 shadow-sm p-3">
            <p className="px-3 pt-2 pb-3 text-xs uppercase tracking-widest text-gray-400">
              Зміст
            </p>
            <TocList activeId={activeId} onPick={pick} />
          </div>
        </aside>

        {/* Текст договору */}
        <main className="space-y-6 min-w-0">
          {OFFER_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-2xl bg-white border border-gray-200 shadow-sm p-5 sm:p-8"
            >
              <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-Ndark text-Ngold font-bold">
                  {section.n}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <OfferItem key={item.n} item={item} />
                ))}
              </div>
            </section>
          ))}

          {/* Реквізити */}
          <section
            id="requisites"
            className="scroll-mt-28 rounded-2xl bg-Ndark text-white p-5 sm:p-8"
          >
            <div className="flex items-center gap-4 pb-5 mb-5 border-b border-white/10">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-Ngold text-Ndark font-bold">
                16
              </span>
              <h2 className="text-xl sm:text-2xl font-bold">Реквізити Виконавця</h2>
            </div>
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {OFFER_REQUISITES.map((r) => (
                <div key={r.label}>
                  <dt className="text-xs uppercase tracking-widest text-Ngold">
                    {r.label}
                  </dt>
                  <dd className="mt-1 text-white/90">
                    {r.href ? (
                      <a href={r.href} className="hover:text-Ngold underline-offset-4 hover:underline">
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 pt-5 border-t border-white/10 text-sm text-white/60">
              Дата набрання чинності редакцією: {OFFER_EFFECTIVE_DATE}
            </p>
          </section>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-Ndark"
            >
              <FiArrowUp /> На початок
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PublicOffer;
