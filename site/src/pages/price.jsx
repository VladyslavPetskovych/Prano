import React from "react";
import PriceGrid from "../components/price/priceGrid";
import PriceTable from "../components/price/priceTable";

function Price() {
  return (
    <div className="pt-24">
      <PriceGrid/>
      <PriceTable/>
    </div>
  );
}

export default Price;
