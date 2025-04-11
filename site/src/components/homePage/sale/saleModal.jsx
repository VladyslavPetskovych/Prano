import React from "react";

function SaleModal({ onClose, deals }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-11/12 max-w-lg relative h-[70vh] overflow-y-auto md:max-h-none">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded-full"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-black mt-8">
          Спеціальні пропозиції🎁
        </h2>
        <ul className="space-y-4">
          {deals.map((deal) => (
            <li
              key={deal._id}
              className="p-4 border rounded-lg shadow-sm bg-gray-100"
            >
              <h3 className="font-semibold text-lg text-gray-900">
                {deal.title}
              </h3>
              <p className="text-gray-700 mt-1">{deal.description}</p>
              {deal.image && (
                <img
                  src={`https://prano.group/api/advertisementImages/${deal.image}`}
                  alt={deal.title}
                  className="w-full h-auto rounded-lg mt-3 shadow-md"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SaleModal;
