import React from "react";
import PriceTable from "../components/price/priceTable";
import PriceTopBlock from "../components/price/PriceTopBlock";
import Merchendise from "../components/price/merchendise";

function Price() {
  return (
    <div className="pt-20 bg-white bg-opacity-70">
      <PriceTopBlock />
      <div className="lg:mx-20 mx-3  rounded-xl">
        <PriceTable />
        <Merchendise />
      </div>
    </div>
  );
}

export default Price;
