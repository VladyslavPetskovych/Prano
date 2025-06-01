import React from "react";
import PriceTable from "../components/price/priceTable";
import PriceTopBlock from "../components/price/PriceTopBlock";
import Merchendise from "../components/price/merchendise";

function Price() {
  return (
    <div className="pt-24">
      <PriceTopBlock/>
      <PriceTable/>
      <Merchendise/>
    </div>
  );
}

export default Price;
