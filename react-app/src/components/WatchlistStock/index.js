import React from "react";
import LineChart from "../LineChart";
import "./WatchlistStock.css";

function WatchlistStock({
  name,
  currentPrice,
  sharesOwned,
  percentChanged,
  labels,
  prices,
}) {
  console.log("PS", labels, prices);
  return (
    <div className="watchlist-stock-container">
      <div className="watchlist-stock-left">
        <span className="watchlist-stock-name">{name}</span>
        <span>{sharesOwned}</span>
      </div>
      <div className="watchlist-stock-mid">
        <LineChart labels={labels} prices={prices} />
      </div>
      <div className="watchlist-stock-right">
        <span>{currentPrice}</span>
        <span className={percentChanged >= 0 ? "positive" : "negative"}>
          {percentChanged}%
        </span>
      </div>
    </div>
  );
}

export default WatchlistStock;
