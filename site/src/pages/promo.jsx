import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Seo } from "../components/utils/seo";
import {
  fetchCampaignPage,
  recordCampaignVisit,
} from "../components/adminpanel/marketing/MarketingApi";

const VISITOR_KEY = "pranoVisitorId";

// Анонімний ідентифікатор браузера — щоб рахувати унікальних людей, а не відкриття
const getVisitorId = () => {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "";
  }
};

function Promo() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [campaign, setCampaign] = useState(null);
  const [status, setStatus] = useState("loading");
  const [copied, setCopied] = useState(false);
  const isVisitRecorded = useRef(false);

  useEffect(() => {
    fetchCampaignPage(slug)
      .then((data) => {
        setCampaign(data);
        setStatus("ready");
      })
      .catch(() => setStatus("notFound"));
  }, [slug]);

  useEffect(() => {
    if (status !== "ready" || isVisitRecorded.current) return;
    isVisitRecorded.current = true;

    const source = searchParams.get("src") === "qr" ? "qr" : "link";
    recordCampaignVisit(slug, { visitorId: getVisitorId(), source }).catch(() => {});

    // Прибираємо мітку, щоб оновлення сторінки чи поширене посилання не рахувались як сканування
    if (source === "qr") setSearchParams({}, { replace: true });
  }, [status, slug, searchParams, setSearchParams]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(campaign.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const title = campaign?.title || "Ваш промокод від Prano";

  return (
    <div className="min-h-screen bg-Ndark pt-32 pb-20 px-4 font-manrope text-white flex items-center justify-center">
      <Seo title={`${title} | Prano`} path={`/promo/${slug}`} noindex />

      {status === "loading" && <p className="text-gray-300">Завантаження...</p>}

      {status === "notFound" && (
        <div className="text-center max-w-md">
          <h1 className="font-tinos text-3xl text-Ngold mb-4">Пропозиція не діє</h1>
          <p className="text-gray-300 mb-8">
            Ця акція вже завершилась або посилання некоректне. Перегляньте наші
            актуальні ціни та послуги.
          </p>
          <Link
            to="/"
            className="inline-block bg-Ngold text-Ndark font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            На головну
          </Link>
        </div>
      )}

      {status === "ready" && (
        <div className="w-full max-w-xl text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-Ngold mb-4">
            Спеціальна пропозиція
          </p>
          <h1 className="font-tinos text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h1>
          {campaign.description && (
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-10 whitespace-pre-line">
              {campaign.description}
            </p>
          )}

          <div className="border-2 border-dashed border-Ngold rounded-2xl p-6 sm:p-8 bg-white/5">
            <p className="text-sm text-gray-400 mb-2">Ваш промокод</p>
            <p className="font-tinos text-4xl sm:text-5xl font-bold text-Ngold tracking-wider break-all mb-6">
              {campaign.promoCode}
            </p>
            <button
              onClick={copyCode}
              className="bg-Ngold text-Ndark font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              {copied ? "Скопійовано ✓" : "Скопіювати промокод"}
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-6 mb-10">
            Назвіть промокод у пункті прийому або вкажіть його в коментарі до
            замовлення.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/price"
              className="border border-Ngold text-Ngold px-6 py-3 rounded-lg hover:bg-Ngold hover:text-Ndark transition"
            >
              Переглянути ціни
            </Link>
            <Link
              to="/contacts"
              className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white hover:text-Ndark transition"
            >
              Пункти прийому
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Promo;
