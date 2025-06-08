import React from "react";

function PremiumInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-black"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-Nblack">Що таке Ціна Преміум?</h2>
        <p className="text-gray-700 leading-relaxed">
          Це спеціальна ціна за додатковий преміальний догляд та обробку вашого одягу — з використанням високоякісних засобів і делікатних технологій.
        </p>
      </div>
    </div>
  );
}

export default PremiumInfoModal;
