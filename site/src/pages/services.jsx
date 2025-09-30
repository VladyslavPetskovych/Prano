import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DryCleaning from "../components/services/dryCleaning";
import Laundry from "../components/services/laundry";
import Shoe from "../components/services/shoeCleaning";
import SewingRepair from "../components/services/repairClothes";
import ShoeRepair from "../components/services/shoeRepair";
import TopPart from "../components/services/topPart";
import BagRestoration from "../components/services/repairBags";

function Services() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="bg-gradient-to-t from-Ngold via-gray-200 to-Ngold">
      <TopPart />

      <section >
        <DryCleaning />
      </section>

      <section >
        <Laundry />
      </section>

      <section >
        <Shoe />
      </section>

      <section >
        <ShoeRepair />
      </section>

      <section >
        <SewingRepair />
      </section>

      <section >
        <BagRestoration />
      </section>
    </div>
  );
}

export default Services;
