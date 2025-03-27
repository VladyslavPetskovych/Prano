import React, { useState, useEffect } from "react";

const Checkbox = ({ isChecked, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [isModalOpen]);

  return (
    <div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="agree"
          checked={isChecked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        {/* The label no longer directly toggles the checkbox */}
        <label className="text-gray-700 cursor-pointer">
          Я погоджуюся з{" "}
          <span
            className="font-semibold text-blue-600 hover:text-blue-500"
            onClick={openModal}
          >
            умовами замовлення
          </span>
        </label>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Умови замовлення</h2>
            <div className="max-h-80 overflow-y-auto text-sm text-gray-700 space-y-4">
              <p>
                <span className="font-semibold">
                  Відповідальність за пошкодження одягу:
                </span>{" "}
                Ми докладаємо всіх зусиль, щоб ваше взуття та одяг були
                оброблені з максимальною обережністю. Однак, ми не несемо
                відповідальності за пошкодження, що виникають через: Наявність
                дефектів або старіння тканини. Невірно вказані інструкції щодо
                догляду за тканиною. Властивості тканин, які можуть не витримати
                хімічної обробки або прання.
              </p>
              <p>
                <span className="font-semibold">
                  Обмеження відповідальності за пошкодження:
                </span>{" "}
                У разі пошкодження вашого одягу, ми компенсуємо шкоду в межах
                вартості самого виробу, але не більше ніж сума, яка була
                оплачена за надану послугу. Компенсація не надається у випадку,
                якщо пошкодження сталися через дефекти тканини чи невірно
                вказані інструкції догляду.
              </p>
              <p>
                <span className="font-semibold">
                  Інструкції щодо догляду за одягом:
                </span>{" "}
                Перед здачею одягу до прання або хімчистки, просимо вас
                повідомити нашому працівнику про будь-які специфічні вимоги або
                інструкції для догляду за виробом. Ми не несемо відповідальності
                за будь-які пошкодження, якщо клієнт не надасть необхідні
                інструкції щодо прання чи очищення.
              </p>
              <p>
                <span className="font-semibold">Випадкові пошкодження:</span>{" "}
                Незважаючи на те, що всі засоби для прання та хімічного очищення
                є безпечними, існує ймовірність випадкових пошкоджень, таких як
                втрата кольору, розтягнення або усадка тканини. У таких випадках
                ми компенсуємо шкоду тільки в межах зазначеної вартості
                прання/хімчистки, якщо це не викликано дефектами тканини або
                неправильною експлуатацією.
              </p>
              <p>
                <span className="font-semibold">Термін виконання послуг:</span>{" "}
                Зазвичай термін виконання послуг становить від 2 до 7 робочих
                днів, залежно від типу послуги та стану одягу. У разі затримок з
                нашого боку, ми обов'язково повідомимо вас про новий строк
                виконання послуги.
              </p>
              <p>
                <span className="font-semibold">Умови повернення одягу:</span>{" "}
                Повернення одягу можливе лише за умови, якщо він не був
                пошкоджений внаслідок неналежного догляду. У разі виявлення
                пошкоджень після отримання одягу, будь ласка, зв'яжіться з нами
                протягом 24 годин для оформлення претензії.
              </p>
              <p>
                <span className="font-semibold">Додаткові умови:</span> Ми
                залишаємо за собою право відмовити в обробці одягу, якщо його
                стан є критичним або є ймовірність, що тканина не витримає
                обробку.
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={closeModal}
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkbox;
