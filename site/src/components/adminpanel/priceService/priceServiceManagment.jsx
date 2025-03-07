import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePriceService from "./createPriceService";
import PriceServiceItem from "./priceServiceItem";
import Pagination from "../pagination";

const PriceServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchServices = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://prano.group/api/products?page=${page}&limit=10`
      );
      console.log("API Response:", response.data);

      setServices(response.data.data);
      setTotalPages(
        Math.ceil(response.data.itemsCount / response.data.perPage)
      );
    } catch (err) {
      setError("Failed to fetch price services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const handleDeleteSuccess = (deletedServiceId) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service._id !== deletedServiceId)
    );
  };

  const handleEditSuccess = (updatedService) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === updatedService._id ? updatedService : service
      )
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading price services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold bg-slate-200 p-5">
        Редагувати послуги і ціни
      </h2>
      <CreatePriceService refreshServices={() => fetchServices(currentPage)} />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="p-3 text-left">Назва</th>
              <th className="p-3 text-left w-64 break-words">Опис</th>

              <th className="p-3 text-left">Ціна</th>
              <th className="p-3 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <PriceServiceItem
                key={service._id}
                service={service}
                onEditSuccess={handleEditSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PriceServiceManagement;
