import React from "react";

function PriceTable() {
  return (
    <div className="p-8 font-sans bg-gray-50">
      <h1 className="text-center text-3xl font-extrabold text-gray-800 mb-8">
        Ціни на прання і хімчистку
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-lg">
              <th className="px-6 py-4 border-b">Послуга</th>
              <th className="px-6 py-4 border-b">Опис</th>
              <th className="px-6 py-4 border-b">Ціна</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {[
              [
                "Просте прання",
                "Прання, сушіння, і прасування",
                "100грн за одну річ",
              ],
              ["Хімчистка", "Хімчистка делікатної тканини", "150грн за річ"],
              [
                "Набиття написів на футболки",
                "Прасування і перебивання написів",
                "120грн за річ",
              ],
              [
                "Постільна білизна",
                "Прання та складання ковдр, ковдр тощо.",
                "100грн за кілограм",
              ],
              [
                "Швидка послуга",
                "Пральня та хімчистка в той же день",
                "100грн додатково за послугу",
              ],
            ].map((row, index) => (
              <tr
                key={index}
                className={`text-gray-800 text-md ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 border-b">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-16">
        <h1 className="text-center text-xl font-semibold text-gray-700">
          При корпоративних замовленнях і великих об'ємах економія до 30%
        </h1>
      </div>
    </div>
  );
}

export default PriceTable;
