import React, { useEffect, useState } from "react";
import axios from "axios";
import SaleModal from "./saleModal";
import Laska from "../../../assets/logo/gptLaska.png";
import { getVisitorId } from "../../utils/visitorId";

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

  const openModal = () => {
    setIsOpen(true);
    // Статистика відкриттів для адмінки, помилка не заважає перегляду
    axios
      .post(`https://prano.group/api/advertisement/${deals[0]._id}/view`, {
        visitorId: getVisitorId(),
      })
      .catch(() => {});
  };

  return (
    <>
      <button
        className="h-36 w-[120px]  text-white fixed left-0 md:left-auto  md:right-0 bottom-4 md:bottom-0 z-30 m-3 md:m-12   "
        onClick={openModal}
      >
        <img
          src={Laska}
          alt="Акції Prano"
          className=" opacity-50 hover:opacity-80 animate-bounce w-[100px] md:w-full"
          style={{ animationDuration: "7s" }}
        />
        <p className="font-tinos text-xl p-1 font-base bg-black bg-opacity-70 rounded-2xl">
          Спеціальні пропозиції
        </p>
      </button>
      {isOpen && <SaleModal onClose={() => setIsOpen(false)} deals={deals} />}
    </>
  );
}

export default SaleButton;
