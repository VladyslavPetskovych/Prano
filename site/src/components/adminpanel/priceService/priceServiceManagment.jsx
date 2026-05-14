import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateService from "./createService";
import CreatePrice from "./Price/createPrices";
import ServiceItem from "./ServiceItem";
import PriceItem from "./Price/priceItem";
import {
  clearAllMerchandiseDiscounts,
  deleteMerchandise,
} from "./Price/PriceApi";
import { apiUrl } from "../../../config/apiOrigin";
import PriceAdvertManagement from "./priceAdvertManagment";

const PriceServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState("services");

  const [categories, setCategories] = useState([]);
  const [showClearDiscountsModal, setShowClearDiscountsModal] = useState(false);
  const [clearingDiscounts, setClearingDiscounts] = useState(false);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);

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
      } else if (viewMode === "prices") {
        const merchRes = await axios.get(apiUrl("/merchandises"));
        const categoryRes = await axios.get(apiUrl("/categories"));

        console.log("📥 Merchandises:", merchRes.data.data);
        console.log("📥 Categories:", categoryRes.data);

        setCategories(categoryRes.data);
        setServices(merchRes.data.data);
        setTotalPages(
          Math.ceil(merchRes.data.itemsCount / merchRes.data.data.length)
        );
      } else {
        setServices([]);
        setCategories([]);
        setTotalPages(1);
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

  const handleClearAllDiscounts = async () => {
    setClearingDiscounts(true);
    try {
      await clearAllMerchandiseDiscounts(services);
      setServices((prev) =>
        prev.map((item) => ({ ...item, discountPercent: 0 }))
      );
      setShowClearDiscountsModal(false);
    } catch (err) {
      console.error("Error clearing discounts:", err);
      alert("Не вдалося очистити знижки.");
    } finally {
      setClearingDiscounts(false);
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
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "advert" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("advert")}
        >
          Реклама
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
      ) : viewMode === "prices" ? (
        <>
          <CreatePrice refreshServices={() => fetchData(currentPage)} />

          <div className="my-3 flex justify-end">
            <button
              type="button"
              className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={() => setShowClearDiscountsModal(true)}
              disabled={clearingDiscounts}
            >
              Очистити всі знижки
            </button>
          </div>

          {showClearDiscountsModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() =>
                !clearingDiscounts && setShowClearDiscountsModal(false)
              }
            >
              <div
                className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="mb-3 text-lg font-bold">Підтвердження</h3>
                <p className="mb-6 text-gray-700">
                  Ви впевнені, що хочете очистити всі знижки для всіх товарів?
                  Цю дію не можна скасувати.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="rounded bg-gray-200 px-4 py-2 transition hover:bg-gray-300 disabled:opacity-60"
                    onClick={() => setShowClearDiscountsModal(false)}
                    disabled={clearingDiscounts}
                  >
                    Скасувати
                  </button>
                  <button
                    type="button"
                    className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600 disabled:opacity-60"
                    onClick={handleClearAllDiscounts}
                    disabled={clearingDiscounts}
                  >
                    {clearingDiscounts ? "Очищення..." : "Так, очистити"}
                  </button>
                </div>
              </div>
            </div>
          )}

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
                  <th>Знижка</th>
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
      ) : (
        <PriceAdvertManagement />
      )}
    </div>
  );
};

export default PriceServiceManagement;
