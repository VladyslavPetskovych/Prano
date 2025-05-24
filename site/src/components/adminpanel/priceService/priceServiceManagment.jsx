import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateService from "./Price/createService";
import CreatePrice from "./Price/createPrices";
import ServiceItem from "./ServiceItem";
import PriceItem from "./Price/priceItem";
import Pagination from "../pagination";

const PriceServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("services");

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const endpoint =
        viewMode === "services"
          ? "https://prano.group/api/products"
          : "https://prano.group/api/merchandises";
      const response = await axios.get(endpoint);
      console.log("API Response:", response.data);

      setServices(response.data.data);
      setTotalPages(
        Math.ceil(response.data.itemsCount / response.data.data.length)
      );
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
    setServices((prev) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
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
          <div className="overflow-x-auto my-3">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-3 text-left">Назва</th>
                  <th className="p-3 text-left">Ціна</th>
                  <th className="p-3 text-left">Дії</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item) => (
                  <PriceItem
                    key={item._id}
                    service={item}
                    onPriceEditSuccess={handleEditSuccess}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PriceServiceManagement;
