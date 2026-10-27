import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Seo } from "../components/utils/seo";
import {
  fetchCampaignPage,
  recordCampaignVisit,
  sendCampaignCode,
  verifyCampaignCode,
} from "../components/adminpanel/marketing/MarketingApi";

const VISITOR_KEY = "pranoVisitorId";
const RESEND_SECONDS = 60;

const STEPS = {
  PHONE: 1,
  CODE: 2,
  DONE: 3,
};

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

// Промокод, уже отриманий на цьому пристрої, показуємо одразу
const savedPromoKey = (slug) => `pranoPromo:${slug}`;
const readSavedPromo = (slug) => {
  try {
    return localStorage.getItem(savedPromoKey(slug));
  } catch {
    return null;
  }
};
const savePromo = (slug, promoCode) => {
  try {
    localStorage.setItem(savedPromoKey(slug), promoCode);
  } catch {
    // без localStorage просто не запам'ятовуємо
  }
};

const getErrorMessage = (error, fallback) =>
  error.response?.data?.message || fallback;

const inputClass =
  "w-full p-4 rounded-xl bg-white text-Ndark text-lg text-center tracking-wider focus:outline-none focus:ring-2 focus:ring-Ngold";
const primaryButtonClass =
  "w-full py-4 rounded-xl text-lg font-semibold bg-Ngold text-Ndark transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";

function Promo() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // Мітку ?src=qr запам'ятовуємо до того, як приберемо її з адреси
  const [source] = useState(() => (searchParams.get("src") === "qr" ? "qr" : "link"));
  const [campaign, setCampaign] = useState(null);
  const [status, setStatus] = useState("loading");
  const [step, setStep] = useState(STEPS.PHONE);
  const [phone, setPhone] = useState("+380");
  const [code, setCode] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const isVisitRecorded = useRef(false);

  useEffect(() => {
    fetchCampaignPage(slug)
      .then((data) => {
        setCampaign(data);
        const saved = readSavedPromo(slug);
        if (saved) {
          setPromoCode(saved);
          setStep(STEPS.DONE);
        }
        setStatus("ready");
      })
      .catch(() => setStatus("notFound"));
  }, [slug]);

  useEffect(() => {
    if (status !== "ready" || isVisitRecorded.current) return;
    isVisitRecorded.current = true;

    recordCampaignVisit(slug, { visitorId: getVisitorId(), source }).catch(() => {});

    // Прибираємо мітку, щоб оновлення сторінки чи поширене посилання не рахувались як сканування
    if (source === "qr") setSearchParams({}, { replace: true });
  }, [status, slug, source, setSearchParams]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const timer = setTimeout(() => setResendIn((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  const sendCode = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await sendCampaignCode(slug, {
        phone,
        visitorId: getVisitorId(),
        source,
      });
      setPhone(data.phone);
      setCode("");
      setStep(STEPS.CODE);
      setResendIn(RESEND_SECONDS);
    } catch (error) {
      setError(getErrorMessage(error, "Не вдалося надіслати SMS. Спробуйте пізніше"));
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await verifyCampaignCode(slug, { phone, code });
      setPromoCode(data.promoCode);
      setSmsSent(data.smsSent);
      savePromo(slug, data.promoCode);
      setStep(STEPS.DONE);
    } catch (error) {
      setError(getErrorMessage(error, "Не вдалося перевірити код"));
    } finally {
      setLoading(false);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const title = campaign?.title || "Отримайте промокод від Prano";

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
            {step === STEPS.PHONE && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-200">
                  Вкажіть номер телефону — ми надішлемо код підтвердження, а
                  після нього промокод.
                </p>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && sendCode()}
                  placeholder="+380XXXXXXXXX"
                  className={inputClass}
                />
                <button
                  onClick={sendCode}
                  disabled={loading || phone.replace(/\D/g, "").length < 10}
                  className={primaryButtonClass}
                >
                  {loading ? "Надсилаємо..." : "Отримати промокод"}
                </button>
                <p className="text-xs text-gray-400">
                  Натискаючи кнопку, ви погоджуєтесь з{" "}
                  <Link to="/privacy-policy" className="underline hover:text-Ngold">
                    політикою конфіденційності
                  </Link>
                  .
                </p>
              </div>
            )}

            {step === STEPS.CODE && (
              <div className="flex flex-col gap-4">
                <p className="text-gray-200">
                  Введіть код з SMS, надісланого на <span className="whitespace-nowrap">{phone}</span>
                </p>
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={4}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  onKeyDown={(e) => e.key === "Enter" && code.length === 4 && verifyCode()}
                  placeholder="Код з SMS"
                  className={inputClass}
                  autoFocus
                />
                <button
                  onClick={verifyCode}
                  disabled={loading || code.length !== 4}
                  className={primaryButtonClass}
                >
                  {loading ? "Перевіряємо..." : "Підтвердити"}
                </button>
                <div className="flex justify-between text-sm text-gray-400">
                  <button
                    onClick={() => {
                      setStep(STEPS.PHONE);
                      setError("");
                    }}
                    className="underline hover:text-Ngold"
                  >
                    Змінити номер
                  </button>
                  <button
                    onClick={sendCode}
                    disabled={loading || resendIn > 0}
                    className="underline hover:text-Ngold disabled:no-underline disabled:cursor-not-allowed"
                  >
                    {resendIn > 0 ? `Надіслати ще раз (${resendIn} с)` : "Надіслати ще раз"}
                  </button>
                </div>
              </div>
            )}

            {step === STEPS.DONE && (
              <>
                <p className="text-sm text-gray-400 mb-2">Ваш промокод</p>
                <p className="font-tinos text-4xl sm:text-5xl font-bold text-Ngold tracking-wider break-all mb-6">
                  {promoCode}
                </p>
                <button
                  onClick={copyCode}
                  className="bg-Ngold text-Ndark font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                  {copied ? "Скопійовано ✓" : "Скопіювати промокод"}
                </button>
                {smsSent && (
                  <p className="text-sm text-gray-300 mt-4">
                    Ми також надіслали промокод вам у SMS.
                  </p>
                )}
              </>
            )}

            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </div>

          {step === STEPS.DONE && (
            <p className="text-sm text-gray-400 mt-6">
              Назвіть промокод у пункті прийому або вкажіть його в коментарі до
              замовлення.
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
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
