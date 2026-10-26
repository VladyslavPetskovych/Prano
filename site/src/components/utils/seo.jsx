import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://prano.group";
export const SITE_NAME = "Prano";
export const DEFAULT_IMAGE = `${SITE_URL}/og/prano-og.jpg`;

// Мета-дані для публічних сторінок. Ключ — шлях маршруту.
const PAGES = {
  "/": {
    title: "Prano — преміум хімчистка та пральня у Львові",
    description:
      "Преміум хімчистка, пральня, чистка та ремонт взуття, реставрація сумок і догляд за хутром у Львові. Пункти прийому по місту та доставка.",
  },
  "/services": {
    title: "Послуги хімчистки, прання та ремонту у Львові | Prano",
    description:
      "Хімчистка одягу, прання, чистка та ремонт взуття, ремонт одягу, реставрація сумок і чистка хутра. Дбайливий догляд за речами у Львові.",
  },
  "/price": {
    title: "Ціни на хімчистку та прання у Львові | Prano",
    description:
      "Актуальні ціни Prano на хімчистку одягу, прання, чистку й ремонт взуття, реставрацію сумок та інші послуги у Львові.",
  },
  "/contacts": {
    title: "Контакти та пункти прийому у Львові | Prano",
    description:
      "Адреси пунктів прийому Prano у Львові та Стрию, телефони, графік роботи й поштомат Нової пошти для відправки речей.",
  },
  "/blog": {
    title: "Блог, новини та акції | Prano",
    description:
      "Новини, акції та поради з догляду за одягом, взуттям і текстилем від хімчистки Prano.",
  },
  "/textile": {
    title: "Хімчистка та реставрація текстилю у Львові | Prano",
    description:
      "Хімчистка, ремонт, відновлення та реставрація одягу й домашнього текстилю у Львові. Дбайливий догляд за вашими речами.",
  },
  "/fur": {
    title: "Чистка та ремонт хутра у Львові | Prano",
    description:
      "Професійне чищення, ремонт, зміна фасону та реставрація хутряних виробів у Львові.",
  },
  "/premium": {
    title: "Преміум догляд за речами | Prano",
    description:
      "Преміум-сервіс Prano: індивідуальний догляд за дорогим одягом, взуттям і аксесуарами у Львові.",
  },
  "/privacy-policy": {
    title: "Політика конфіденційності | Prano",
    description: "Політика конфіденційності та обробки персональних даних Prano.",
  },
};

// Службові сторінки, які не мають потрапляти в пошук
const NOINDEX_PREFIXES = [
  "/account",
  "/login",
  "/admin",
  "/reset-password",
  "/restore-password",
  "/promo",
];

export const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  children,
}) => {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      {!noindex && <link rel="canonical" href={url} />}

      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      {children}
    </Helmet>
  );
};

// Мета-дані за поточним маршрутом. Сторінки з динамічними даними
// (наприклад, стаття блогу) рендерять власний <Seo />, який перекриває цей.
export const RouteSeo = () => {
  const { pathname } = useLocation();
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

  const page = PAGES[path];
  if (page) return <Seo {...page} path={path} />;

  const isPrivate = NOINDEX_PREFIXES.some((prefix) => path.startsWith(prefix));
  if (isPrivate) return <Seo title={SITE_NAME} path={path} noindex />;

  // Стаття блогу задає мета-дані сама
  if (path.startsWith("/blog/")) return null;

  return <Seo title="Сторінку не знайдено | Prano" path={path} noindex />;
};

const DAYS = {
  Пн: "Monday",
  Вт: "Tuesday",
  Ср: "Wednesday",
  Чт: "Thursday",
  Пт: "Friday",
  Сб: "Saturday",
  Нд: "Sunday",
};
const DAY_ORDER = Object.keys(DAYS);

// "Пн-Пт" → [Monday..Friday], "Сб" → [Saturday]
const parseDays = (label) => {
  const [from, to = from] = label.split("-").map((d) => d.trim());
  const start = DAY_ORDER.indexOf(from);
  const end = DAY_ORDER.indexOf(to);
  if (start === -1 || end === -1 || end < start) return [];
  return DAY_ORDER.slice(start, end + 1).map((d) => DAYS[d]);
};

const parseOpeningHours = (schedule = {}) =>
  Object.entries(schedule).flatMap(([days, hours]) => {
    const time = /^(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})$/.exec(hours.trim());
    const dayOfWeek = parseDays(days);
    if (!time || !dayOfWeek.length) return [];
    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: time[1],
        closes: time[2],
      },
    ];
  });

// "м. Стрий, вул. ..." → { city: "Стрий", street: "вул. ..." }, інакше — Львів
const parseAddress = (name) => {
  const match = /^м\.\s*([^,]+),\s*(.+)$/.exec(name.trim());
  return match
    ? { city: match[1].trim(), street: match[2].trim() }
    : { city: "Львів", street: name.trim() };
};

export const buildLocationsSchema = (locations) => ({
  "@context": "https://schema.org",
  "@graph": locations.map((location) => {
    const { city, street } = parseAddress(location.name);
    return {
      "@type": "DryCleaningOrLaundry",
      "@id": `${SITE_URL}/contacts#${location._id}`,
      name: `${SITE_NAME} — ${location.name}`,
      url: `${SITE_URL}/contacts`,
      image: DEFAULT_IMAGE,
      telephone: location.phone,
      priceRange: "₴₴",
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: city,
        addressCountry: "UA",
      },
      openingHoursSpecification: parseOpeningHours(location.schedule),
      ...(location.googleMapsUrl && { hasMap: location.googleMapsUrl }),
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
    };
  }),
});

export const JsonLd = ({ data }) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);
