import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NovaPoshtaPostomatIcon from "../../assets/icons/novaPoshtaPostomat.png";
import { useAddresses } from "../../hooks/useAddresses";

const Contacts = ({ backgroundClass }) => {
  const { locations, postomatData, loading, error } = useAddresses();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");

  const activeLocation = selectedLocation || locations[0];

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${backgroundClass} text-white flex items-center justify-center`}>
        <p>Завантаження адрес...</p>
      </div>
    );
  }

  if (error || !locations.length) {
    return (
      <div className={`min-h-screen ${backgroundClass} text-white flex items-center justify-center`}>
        <p>{error || "Адреси тимчасово недоступні."}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${backgroundClass} text-white`}>
      <div className="max-w-7xl mx-auto flex justify-center flex-col w-full px-5 pt-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-Ngold relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
          Наші пункти прийому
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 text-gray-300 px-8">
          {locations.map((location) => {
            const isActive = activeLocation?._id === location._id;
            return (
              <div
                key={location._id}
                onClick={() => setSelectedLocation(location)}
                className={`group relative flex flex-col h-full overflow-hidden rounded-2xl p-5 cursor-pointer transition-all duration-300 backdrop-blur-sm
                  ${
                    isActive
                      ? "bg-gradient-to-br from-Ngold/20 to-gray-900/90 border border-Ngold shadow-[0_0_25px_-5px_rgba(212,175,55,0.5)]"
                      : "bg-gray-900/70 border border-white/10 hover:border-Ngold/60 hover:-translate-y-1 hover:shadow-xl"
                  }`}
              >
                {/* accent bar */}
                <span
                  className={`absolute top-0 left-0 h-full w-1 transition-colors duration-300 ${
                    isActive ? "bg-Ngold" : "bg-transparent group-hover:bg-Ngold/50"
                  }`}
                />

                <h3
                  className="font-semibold text-white leading-snug min-h-[3.5rem] flex items-start"
                  style={{ fontSize: `${location.nameFontSize || 16}px` }}
                >
                  {location.name}
                </h3>

                <a
                  href={`tel:${location.phone.replace(/\D/g, "")}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-1 inline-flex items-center gap-2 self-start text-sm font-medium text-Ngold hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 shrink-0"
                  >
                    <path d="M6.62 10.79a15.53 15.53 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.4 11.4 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.57 1 1 0 01-.24 1.05l-2.2 2.17z" />
                  </svg>
                  {location.phone}
                </a>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-1 text-sm text-gray-400">
                  {Object.entries(location.schedule || {}).map(([day, hours], i) => (
                    <p key={i} className="flex justify-between gap-3">
                      <span className="font-medium text-Ngold/90">{day}</span>
                      <span className="tabular-nums">{hours}</span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeLocation?.mapUrl && (
        <div className="flex items-center justify-center p-7">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={activeLocation._id}
              src={activeLocation.mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>
      )}

      {postomatData && (
        <div className="px-3 sm:px-5 pb-4">
          <div className="max-w-6xl mx-auto rounded-2xl border border-Ngold/40 bg-Ndark/80 shadow-xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="flex items-start sm:items-center gap-3">
                <img
                  src={NovaPoshtaPostomatIcon}
                  alt="Поштомат Нової пошти"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shrink-0 mt-1 sm:mt-0"
                />
                <div>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-Ngold leading-tight">
                    Поштомат Нової пошти
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mt-1">
                    Адреса поштомату, для відправки речей
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  copyText(
                    `Поштомат: ${postomatData.postomat}\nМісто: ${postomatData.city}\nТелефон: ${postomatData.phone}\nОтримувач: ${postomatData.receiver}`,
                    "all"
                  )
                }
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-Ngold text-Ndark font-semibold hover:opacity-90 transition"
              >
                {copiedKey === "all" ? "Скопійовано" : "Скопіювати"}
              </button>
            </div>
            <div className="grid gap-2 text-gray-200 text-sm sm:text-lg">
              <button
                type="button"
                onClick={() => copyText(postomatData.postomat, "postomat")}
                className="text-left rounded-md px-3 py-2 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-Ngold font-semibold">Поштомат:</span>{" "}
                {postomatData.postomat}
                {copiedKey === "postomat" ? (
                  <span className="ml-2 text-xs text-green-300">Скопійовано</span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => copyText(postomatData.city, "city")}
                className="text-left rounded-md px-3 py-2 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-Ngold font-semibold">Місто:</span>{" "}
                {postomatData.city}
                {copiedKey === "city" ? (
                  <span className="ml-2 text-xs text-green-300">Скопійовано</span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => copyText(postomatData.phone, "phone")}
                className="text-left rounded-md px-3 py-2 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-Ngold font-semibold">Телефон:</span>{" "}
                {postomatData.phone}
                {copiedKey === "phone" ? (
                  <span className="ml-2 text-xs text-green-300">Скопійовано</span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => copyText(postomatData.receiver, "receiver")}
                className="text-left rounded-md px-3 py-2 border border-white/10 hover:bg-white/10 transition"
              >
                <span className="text-Ngold font-semibold">Отримувач:</span>{" "}
                {postomatData.receiver}
                {copiedKey === "receiver" ? (
                  <span className="ml-2 text-xs text-green-300">Скопійовано</span>
                ) : null}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeLocation?.images?.length > 0 && (
        <div className="flex items-center justify-center p-7">
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
            {activeLocation.images.map((img, i) => (
              <motion.img
                key={i}
                src={img}
                alt={`${activeLocation.name} фото ${i + 1}`}
                className={`
                w-full h-56 sm:h-64 md:h-72 object-cover rounded-lg shadow-lg
                ${i === 0 || i === 1 ? "block" : "hidden lg:block"}
              `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
