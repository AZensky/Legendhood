import React from "react";
import "./PopularStock.css";

function PopularStock({ name, currentPrice, sharesOwned, percentChanged }) {
  return (
    <div className="popular-stock-container">
      <div className="popular-stock-left">
        <span>{name}</span>
        <span>{sharesOwned}</span>
      </div>
      <div className="popular-stock-right">
        <span>{currentPrice}</span>
        <span>{percentChanged}</span>
      </div>
    </div>
  );
}

export default PopularStock;
