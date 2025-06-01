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
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Помилка завантаження даних");
        setLoading(false);
      });
  }, []);

  return (
    <div className="px-4 sm:p-6 font-sans bg-gray-50">
 

      {loading ? (
        <p className="text-center text-gray-600">Завантаження...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto sm:overflow-visible">
          <table className="min-w-full border-collapse bg-white shadow-md rounded-lg hidden sm:table">
            <thead>
              <tr className="bg-Ngold bg-opacity-40">
                <th className="p-3 border">Назва</th>
                <th className="p-3 border">Опис</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3 border">{product.title}</td>
                  <td className="p-3 border">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sm:hidden">
            {products.map((product) => (
              <div
                key={product._id}
                className=" p-4 mb-4 shadow-md rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    
    </div>
  );
}

export default PriceTable;
