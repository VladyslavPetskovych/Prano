import React, { useEffect, useState } from "react";
import axios from "axios";

function PriceTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://prano.group/api/products")
      .then((response) => {
        setProducts(response.data.data); // Accessing data from 'data' key
        setLoading(false);
      })
      .catch((err) => {
        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 sm:p-8 font-sans bg-gray-50">
      <h2 className="text-3xl w-full mx-auto  sm:text-4xl font-bold font-roboto text-center  text-Ndark relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
        Ціни на прання і хімчистку:
      </h2>

      {/* Loader and error messages */}
      {loading ? (
        <p className="text-center text-gray-600">Завантаження...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto sm:overflow-visible">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg hidden sm:table">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Назва</th>
                <th className="p-3 border">Опис</th>
                <th className="p-3 border">Ціна</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3 border">{product.title}</td>
                  <td className="p-3 border">{product.description}</td>
                  <td className="p-3 border">
                    {product.priceFrom} - {product.priceTo} грн
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card layout for smaller screens */}
          <div className="sm:hidden">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 mb-4 shadow-md rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-700 mt-2">
                  Ціна: {product.priceFrom} - {product.priceTo} грн
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16">
        <h1 className="text-center text-lg sm:text-xl font-semibold text-gray-700">
          При корпоративних замовленнях і великих об'ємах економія до 30%
        </h1>
      </div>
    </div>
  );
}

export default PriceTable;
