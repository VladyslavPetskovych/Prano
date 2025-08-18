import React, { useState } from "react";

const Contacts = ({ backgroundClass }) => {
  const locations = [
    {
      name: "Липинського, 54",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.1130036332244!2d24.030968376842735!3d49.857592571579224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add021fba2607%3A0x34d0d71274100ac6!2sLypynskoho%2054%2C%20L'viv!5e0!3m2!1sen!2sua!4v1742389961537!5m2!1sen!2sua",
      schedule: {
        "Пн-Пт": "09:00-18:00",
        "Сб-Нд": "вихідні",
      },
    },
    {
      name: "Під Дубом, 26а",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2570.1753545152216!2d24.028755676842647!3d49.85168537157929!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add1f9fef8889%3A0xc9a8b93c9b8d5a3b!2sPid%20Dubom%2026a%2C%20L'viv!5e0!3m2!1sen!2sua!4v1742389961538!5m2!1sen!2sua",
      schedule: {
        "Пн-Пт": "08:00-20:00",
        "Сб-Нд": "11:00-20:00",
      },
    },
    {
      name: "Червоної Калини, 60",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d557.3087632737922!2d24.053616723094002!3d49.79447513189752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae872838e9d97%3A0x7970f68cd0a5ad10!2sChervonoyi%20Kalyny%20Ave%2C%2060%2C%20L'viv%2C%20L'vivs'ka%20oblast%2C%2079000!5e0!3m2!1sen!2sua!4v1742390497284!5m2!1sen!2sua",
      schedule: {
        "Пн-Пт": "08:00-20:00",
        "Сб-Нд": "11:00-20:00",
      },
    },
  ];

  const [selectedMap, setSelectedMap] = useState(locations[0].mapUrl);

  return (
    <div className={`min-h-screen ${backgroundClass} text-white`}>
      <div className="max-w-6xl mx-auto flex justify-center flex-col w-full px-6 pt-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-Ngold relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
          Наші пункти прийому
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-gray-300 px-10">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg shadow-lg border border-yellow-500 hover:scale-105 transition cursor-pointer"
              onClick={() => setSelectedMap(location.mapUrl)}
            >
              <h3 className="text-xl font-semibold text-white">
                {location.name}
              </h3>
              <div className="mt-2 text-sm">
                {Object.entries(location.schedule).map(([day, hours], i) => (
                  <p key={i}>
                    <span className="font-semibold text-Ngold">
                      {day}:
                    </span>{" "}
                    {hours}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-7">
        <iframe
          src={selectedMap}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Contacts;
