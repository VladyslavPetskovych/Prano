import React from "react";

function Prices() {
  return (
    <div className="p-6 font-sans">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-6">
        Pricing for Laundry & Dry Cleaning
      </h1>
      <table className="min-w-full table-auto border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-sm text-gray-600">
            <th className="px-4 py-2 border-b border-gray-300">Послуга</th>
            <th className="px-4 py-2 border-b border-gray-300">Опис</th>
            <th className="px-4 py-2 border-b border-gray-300">Ціна</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Просте прання
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Прання, сушіння, і прасування
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              100грн за одну річ
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Хімчистка
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Хімчистка делікатної тканини
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              150грн за річ
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Набиття написів на футболки
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Прасування і перебивання написів
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              120грн за річ
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Постільна білизна
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Прання та складання ковдр, ковдр тощо.
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              100грн за кілограм
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Швидка послуга
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              Пральня та хімчистка в той же день
            </td>
            <td className="px-4 py-2 border-b border-gray-300 text-sm">
              100грн додатково за послугу
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Prices;
