import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DryCleaning from "../components/services/dryCleaning";
import Laundry from "../components/services/laundry";
import Shoe from "../components/services/shoeCleaning";
import SewingRepair from "../components/services/repairClothes";
import ShoeRepair from "../components/services/shoeRepair"
import  TopPart  from "../components/services/topPart";

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
    <div className="bg-gradient-to-t from-Ngold via-Nblue to-Nblue">
      <TopPart/>

      <section id="cleaning">
        <DryCleaning />
      </section>

      <section id="laundry">
        <Laundry />
      </section>

      <section id="shoes-cleaning">
        <Shoe />
      </section>

      <section id="clothing-repair">
        <SewingRepair />
      </section>

      <section id="shoes-repair">
        <ShoeRepair />
      </section>
    </div>
  );
}

export default Services;
