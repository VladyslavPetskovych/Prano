import React, { useEffect, useState } from "react";
import axios from "axios";
import CatLogo from "../../assets/logo/CatLogoDark.svg";

function PriceTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://prano.group/api/products")
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, []);

  return (
    <section className="px-4 py-12 sm:px-8 bg-Ngold bg-opacity-40 rounded-3xl shadow-2xl border font-sans border-Ndark  hover:shadow-2xl">
      <div className="flex flex-col md:flex-row justify-center items-center mb-4 md:mb-16">
        <h2 className="text-3xl md:ml-36 font-extrabold text-center text-Nblack mb-6 md:mb-1 tracking-wide relative inline-block after:content-[''] after:block after:w-24 after:h-1 after:mt-4 after:mx-auto after:bg-Ngold">
          Опис послуг
        </h2>
        <img className="w-32 mx-3" src={CatLogo} alt="Cat logo" />
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Завантаження...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {products.map((product) => (
            <div
              key={product._id}
              className=" relative rounded-t-2xl bg-white border border-Ngold/30 shadow-[0_6px_15px_-4px_rgba(0,0,0,0.2)]  transform transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Заголовок як верхня "складка" */}
              <h3 className="text-2xl font-bold text-Nblack bg-Ngold rounded-t-2xl px-5 py-4 transition-colors duration-300 relative z-10 border-b-4 border-white group-hover:border-Ngold">
                {product.title}
              </h3>

              {/* Текст як "вміст під заголовком" */}
              <div className="p-5 text-gray-700 leading-relaxed text-sm sm:text-lg font-bold bg-gradient-to-b from-white via-white to-gray-50">
                {product.description}
              </div>

              {/* Імітація "краю" одягу — тінь/бордер знизу */}
              <div className="h-2 bg-gradient-to-r from-Ngold/20 via-white to-Ngold/20 opacity-50"></div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PriceTable;
