import React, { useEffect, useState } from "react";
import axios from "axios";
import SaleModal from "./saleModal";

function SaleButton() {
  const [deals, setDeals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://prano.group/api/advertisement")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setDeals(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching special deals:", error);
      });
  }, []);

  if (deals.length === 0) return null;

  return (
    <>
      <button
        className="h-16 w-[120px] text-white fixed right-0 bottom-0 z-30 m-3 md:m-12 bg-black opacity-50 hover:bg-red-500 hover:opacity-80"
        onClick={() => setIsOpen(true)}
      >
        <p className="font-roboto shadow-lg shadow-orange-500/50">
          Спеціальні пропозиції🎁
        </p>
      </button>
      {isOpen && (
        <SaleModal onClose={() => setIsOpen(false)} deals={deals} />
      )}
    </>
  );
}

export default SaleButton;
