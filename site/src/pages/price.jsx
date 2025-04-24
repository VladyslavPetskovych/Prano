import React from "react";
import PriceTable from "../components/price/priceTable";
import PriceTopBlock from "../components/price/PriceTopBlock";

function Price() {
  return (
    <div className="pt-24">
      <PriceTopBlock/>
      <PriceTable/>
    </div>
  );
}

export default Price;
