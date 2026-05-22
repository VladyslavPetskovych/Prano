/** Початкові дані з колишньої сторінки контактів — використовуються при першому запуску / seed. */
const DEFAULT_ADDRESSES = [
  {
    name: "Липинського, 54",
    phone: "+380771515111",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.1130036332244!2d24.030968376842735!3d49.857592571579224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add021fba2607%3A0x34d0d71274100ac6!2sLypynskoho%2054%2C%20L'viv!5e0!3m2!1sen!2sua!4v1742389961537!5m2!1sen!2sua",
    googleMapsUrl: "https://share.google/jOYnBbJyAEzEZpRrb",
    schedule: {
      "Пн-Пт": "09:00-20:00",
      Сб: "11:00-20:00",
      Нд: "вихідний",
    },
    sortOrder: 0,
    isActive: true,
  },
  {
    name: "Під Дубом, 26а",
    phone: "+380969386418",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.1753545152216!2d24.028755676842647!3d49.85168537157929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add1f9fef8889%3A0xc9a8b93c9b8d5a3b!2sPid%20Dubom%2026a%2C%20L'viv!5e0!3m2!1sen!2sua!4v1742389961538!5m2!1sen!2sua",
    googleMapsUrl: "https://share.google/4mPF1aXWlHxd3DMv",
    schedule: {
      "Пн-Пт": "09:00-20:00",
      "Сб-Нд": "11:00-20:00",
    },
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Червоної Калини, 60",
    phone: "+380688074310",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d557.3087632737922!2d24.053616723094002!3d49.79447513189752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae872838e9d97%3A0x7970f68cd0a5ad10!2sChervonoyi%20Kalyny%20Ave%2C%2060%2C%20L'viv!5e0!3m2!1sen!2sua!4v1742390497284!5m2!1sen!2sua",
    googleMapsUrl: "https://share.google/YQEd4nvvd4QF407ok",
    schedule: {
      "Пн-Пт": "09:00-20:00",
      "Сб-Нд": "11:00-20:00",
    },
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Мельника, 18",
    phone: "+380687430691",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d454.9635633513673!2d24.003696040646695!3d49.8300069358789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add00167a6f77%3A0x9e7c647088345292!2sPrano!5e0!3m2!1suk!2sua!4v1764143486532!5m2!1suk!2sua",
    googleMapsUrl:
      "https://www.google.com/maps/place/Prano/@49.8300069,24.003696,17z",
    schedule: {
      "Пн-Пт": "09:00-20:00",
      "Сб-Нд": "11:00-20:00",
    },
    sortOrder: 3,
    showNewBadge: true,
    isActive: true,
  },
];

const DEFAULT_POSTOMAT = {
  postomat: "40464",
  city: "Львів",
  phone: "0771515111",
  receiver: "Преміумсервіс «Прано» (Львів)",
};

/** Файли в server/seed/contacts/ для кожної адреси */
const ADDRESS_SEED_IMAGES = {
  "Липинського, 54": ["lyp1.webp", "lyp2.webp", "lyp3.webp"],
  "Під Дубом, 26а": ["dub1.webp", "dub2.webp", "dub3.webp"],
  "Червоної Калини, 60": ["kal1.webp", "kal2.webp", "kal3.webp"],
  "Мельника, 18": ["leo1.png"],
};

const SEED_CONTACTS_DIR = require("path").join(
  __dirname,
  "../../seed/contacts"
);

module.exports = {
  DEFAULT_ADDRESSES,
  DEFAULT_POSTOMAT,
  ADDRESS_SEED_IMAGES,
  SEED_CONTACTS_DIR,
};
