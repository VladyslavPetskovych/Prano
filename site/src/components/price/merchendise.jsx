import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./searchInput";

function Merchandise() {
  const [merchandise, setMerchandise] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const merchRes = await axios.get(
          "https://prano.group/api/merchandises"
        );
        const categoryRes = await axios.get(
          "https://prano.group/api/categories"
        );

        const merchArray = merchRes.data.data;
        const categoriesArray = categoryRes.data.data;
        console.log("📥 Merchandises:", merchArray);
        console.log("📥 Categories:", categoriesArray);
        setMerchandise(merchArray);
        setCategories(categoriesArray);

        const grouped = {};
        categoriesArray.forEach((cat) => {
          grouped[cat._id] = {
            title: cat.title,
            items: [],
          };
        });

        merchArray.forEach((item) => {
          if (grouped[item.categoryId]) {
            grouped[item.categoryId].items.push(item);
          }
        });

        setGroupedData(grouped);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-8 py-12 font-tinos ">
      <SearchInput />
      {Object.entries(groupedData).map(([categoryId, group]) => (
        <div key={categoryId} className="border p-1 shadow-md">
          <h2 className="text-2xl font-bold py-2 bg-Ngold bg-opacity-40 font-manrope ">
            {group.title}
          </h2>
          <table className="min-w-full border border-gray-300 table-fixed ">
            <thead className="bg-Ngold bg-opacity-20 ">
              <tr>
                <th className="border px-4 py-2 w-1/2 ">Назва речі</th>
                <th className="border px-4 py-2 w-1/10 "></th>
                <th className="border px-4 py-2 w-1/4">Ціна</th>
                <th className="border px-4 py-2 w-1/4">Ціна Преміум</th>
              </tr>
            </thead>
            <tbody className="text-left font-semibold">
              {group.items.map((item, index) => (
                <tr
                  key={item._id}
                  className={
                    index % 2 === 0 ? "bg-white" : "bg-Ngold bg-opacity-20"
                  }
                >
                  <td className="border px-4 py-2 w-1/2">{item.title}</td>
                   <td className="border px-4 py-2 w-1/10">шт.</td>
                  <td className="border px-4 py-2 w-1/4 text-center">
                    {item.price}
                  </td>
                  <td className="border px-4 py-2 w-1/4 text-center">
                    {item.secondPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-16">
        <h1 className="text-center text-lg sm:text-xl font-semibold text-gray-700">
          При корпоративних замовленнях і великих об'ємах економія до 30%
        </h1>
      </div>
    </div>
  );
}

export default Merchandise;
