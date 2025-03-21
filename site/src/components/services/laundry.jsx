import React from "react";
import laundry from "../../assets/service/laundry.jpg";

function Laundry() {
  return (
    <section className="bg-darkBlue py-10 flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="p-10 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-900">Прання</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            Професійне прання – це не просто видалення забруднень, а дбайливий
            догляд за тканинами. Ми використовуємо екологічні мийні засоби, що
            зберігають колір і структуру матеріалу.
          </p>
          <ul>
            <li>- Очищення без пошкодження тканини </li>
            <li>- Індивідуальний підхід до кожного виробу </li>
            <li>- Гіпоалергенні, безпечні засоби</li>
          </ul>
        </div>

        <div className="relative flex justify-center items-center p-6">
          <img
            src={laundry}
            alt="Laundry process"
            className="w-full max-h-80 rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Laundry;
