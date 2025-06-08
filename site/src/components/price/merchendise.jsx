import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchInput from "./searchInput";
import CatLogo from "../../assets/logo/CatLogoDark.svg";
import PremiumInfoModal from "./PremiumInfoModal";

function Merchandise() {
  const [merchandise, setMerchandise] = useState([]);
  const [categories, setCategories] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [isPremiumModalOpen, setPremiumModalOpen] = useState(false);

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
    <div className="py-4 mt-10 space-y-5  font-manrope font-bold max-w-8xl mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center  px-10">
        <h2 className="text-3xl font-sans  font-extrabold  text-Nblack mb-6 md:mb-1 tracking-wide relative inline-block after:content-[''] after:block after:w-24 after:h-1 after:mt-4 after:mx-auto after:bg-Ngold">
          Ціни
        </h2>
        <SearchInput />
      </div>

      {Object.entries(groupedData).map(([categoryId, group]) => (
        <div
          key={categoryId}
          className="bg-white shadow-2xl rounded-3xl border border-Ngold/30 overflow-hidden transition-transform border-Ndark  hover:shadow-2xl"
        >
          <h2 className="text-3xl font-extrabold tracking-wide text-Nblack bg-Ngold py-5 px-8">
            {group.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-Ngold/30 text-Nblack uppercase tracking-wider">
                  <th className="px-6 py-4 text-left w-1/2">Назва речі</th>
                  <th className="px-6 py-4 text-center w-1/8 hidden md:block">
                    Од.
                  </th>
                  <th className="px-6 py-4 text-center w-1/6">Ціна</th>
                  <th className="px-6 py-4 w-1/6">
                    <div className="flex items-center justify-center gap-2 relative">
                      <img
                        src={CatLogo}
                        alt="logo"
                        className="w-9 object-contain"
                      />
                      <span>Ціна Преміум</span>

                      {/* знак питання */}
                      <button
                        onClick={() => setPremiumModalOpen(true)}
                        className="text-Nblack text-lg ml-1 hover:text-Ngold transition-colors"
                        title="Що таке Ціна Преміум?"
                      >
                        (?)
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-left font-manrope text-gray-700">
                {group.items.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0
                        ? "bg-white hover:bg-Ngold/20"
                        : "bg-Ngold/30 hover:bg-Ngold/20"
                    } transition-colors duration-300 cursor-pointer`}
                  >
                    <td className="px-6 py-4 truncate">{item.title}</td>
                    <td className="px-6 py-4 text-center  hidden md:block">
                      шт.
                    </td>
                    <td className="px-6 py-4 text-center">{item.price}</td>
                    <td className="px-6 py-4 text-center">
                      {item.secondPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <PremiumInfoModal
              isOpen={isPremiumModalOpen}
              onClose={() => setPremiumModalOpen(false)}
            />
          </div>
        </div>
      ))}

      <div className="mt-16 max-w-3xl mx-auto text-center bg-white border border-Ngold/30 p-6 rounded-xl shadow-lg">
        <h1 className="text-lg sm:text-xl font-semibold text-Nblack tracking-wide leading-relaxed">
          При корпоративних замовленнях і великих об'ємах економія до{" "}
          <span className=" font-extrabold">30%</span>
        </h1>
      </div>
    </div>
  );
}

export default Merchandise;
