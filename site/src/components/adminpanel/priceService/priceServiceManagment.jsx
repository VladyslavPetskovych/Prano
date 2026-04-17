import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateService from "./createService";
import CreatePrice from "./Price/createPrices";
import ServiceItem from "./ServiceItem";
import PriceItem from "./Price/priceItem";
import Pagination from "../pagination";
import { deleteMerchandise } from "./Price/PriceApi";
import { apiUrl } from "../../../config/apiOrigin";

const PriceServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("services");

  const [categories, setCategories] = useState([]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);

      if (viewMode === "services") {
        const res = await axios.get(apiUrl("/products"));
        console.log("📥 Products Response:", res.data);
        const list = Array.isArray(res.data.data) ? res.data.data : [];
        setServices(
          [...list].sort((a, b) => {
            const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return at - bt;
          })
        );
        setTotalPages(1); // без пагінації
      } else {
        const merchRes = await axios.get(apiUrl("/merchandises"));
        const categoryRes = await axios.get(apiUrl("/categories"));

        console.log("📥 Merchandises:", merchRes.data.data);
        console.log("📥 Categories:", categoryRes.data);

        setCategories(categoryRes.data);
        setServices(merchRes.data.data);
        setTotalPages(
          Math.ceil(merchRes.data.itemsCount / merchRes.data.data.length)
        );
      }
    } catch (err) {
      setError("Не вдалося отримати дані.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, viewMode]);

  const handleDeleteSuccess = (deletedServiceId) => {
    setServices((prev) => prev.filter((item) => item._id !== deletedServiceId));
  };

  const handleEditSuccess = (updatedItem) => {
    setServices((prev) => {
      const next = prev.map((item) =>
        item._id === updatedItem._id ? { ...item, ...updatedItem } : item
      );
      return [...next].sort((a, b) => {
        const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return at - bt;
      });
    });
  };
  const handleDeleteMerchandise = async (id) => {
    try {
      await deleteMerchandise(id);
      setServices((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting merchandise:", err);
      alert("Failed to delete merchandise.");
    }
  };

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-2">
      <h2 className="text-xl font-bold bg-slate-200 p-4">
        Редагувати послуги і ціни
      </h2>

      <div className="flex justify-start gap-4 my-4">
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "services" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("services")}
        >
          Послуги
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "prices" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("prices")}
        >
          Ціни
        </button>
      </div>

      {viewMode === "services" ? (
        <>
          <CreateService refreshServices={() => fetchData(currentPage)} />
          <div className="overflow-x-auto my-3">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-3 text-left">Назва</th>
                  <th className="p-3 text-left break-words">Опис</th>
                  <th className="p-3 text-left">Дії</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <ServiceItem
                    key={service._id}
                    service={service}
                    onEditSuccess={handleEditSuccess}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <CreatePrice refreshServices={() => fetchData(currentPage)} />
          <div className="md:hidden my-3 space-y-3">
            {services.map((item) => (
              <PriceItem
                key={item._id}
                service={item}
                categories={categories}
                onEditSuccess={handleEditSuccess}
                onDeleteRequest={handleDeleteMerchandise}
                layout="card"
              />
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto my-3">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
              <thead>
                <tr>
                  <th>Назва</th>
                  <th>Ціна</th>
                  <th>Друга ціна</th>
                  <th>К-сть</th>
                  <th>Порядок</th>
                  <th>Категорія</th>
                  <th>Дії</th>
                </tr>
              </thead>

              <tbody>
                {services.map((item) =>
                  viewMode === "prices" ? (
                    <PriceItem
                      key={item._id}
                      service={item}
                      categories={categories}
                      onEditSuccess={handleEditSuccess}
                      onDeleteRequest={handleDeleteMerchandise}
                    />
                  ) : null
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceServiceManagement;
