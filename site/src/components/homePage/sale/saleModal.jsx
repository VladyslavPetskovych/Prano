import React from "react";

function SaleModal({ onClose, deals }) {
  const deal = deals?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-Ndark bg-opacity-60"
      onClick={onClose} // Закриває при кліку по фону
    >
      <div
        className="relative w-11/12 max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Зупиняє клік всередині модалки
      >
        {/* Кнопка закриття */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800 transition hover:bg-gray-200"
        >
          ✕
        </button>

        {/* Заголовок */}
        <div className="bg-Ndark px-8 py-4 pt-9 text-center">
          <h2 className="text-xl font-bold text-Ngold">
            Спеціальна пропозиція 🎁
          </h2>
        </div>

        {/* Тіло модалки */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-6">
          {deal ? (
            <div className="mx-auto w-full overflow-hidden rounded-xl shadow-sm transition hover:shadow-lg">
              {deal.image && (
                <div className="h-52 w-full overflow-hidden">
                  <img
                    src={`https://prano.group/api/advertisementImages/${deal.image}`}
                    alt={deal.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy" // ✅ відкладене завантаження
                    decoding="async" // ✅ асинхронне декодування
                    sizes="(max-width: 768px) 100vw, 600px" // ✅ оптимізація для мобільних
                  />
                </div>
              )}
              <div className="flex flex-col justify-between p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  {deal.title}
                </h3>
                <p className="mt-3 text-gray-700 whitespace-pre-line break-words">
                  {deal.description}
                </p>
              </div>
            </div>
          ) : (
            <p className="mt-8 text-center text-gray-500">
              Наразі немає доступної пропозиції.
            </p>
          )}
        </div>

        {/* Футер з кнопкою Закрити */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-right">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-900 px-6 py-2 text-white transition hover:bg-gray-800"
          >
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleModal;
