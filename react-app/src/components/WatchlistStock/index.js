import React from "react";
import LineChart from "../LineChart";
import { numberWithCommas } from "../../util/stocks-api";
import "./WatchlistStock.css";

function WatchlistStock({
  name,
  currentPrice,
  sharesOwned,
  percentChanged,
  labels,
  prices,
  liveDataAvailable,
}) {
  return (
    <div className="watchlist-stock-container">
      <div className="watchlist-stock-left">
        <span className="watchlist-stock-name">{name}</span>
        <span>{numberWithCommas(sharesOwned)}</span>
      </div>
      <div className="watchlist-stock-mid">
        {liveDataAvailable ? (
          <LineChart labels={labels} prices={prices} />
        ) : (
          <div className="watchlist-stock-no-live-data">Market Closed</div>
        )}
      </div>
      <div className="watchlist-stock-right">
        <span>${numberWithCommas(currentPrice)}</span>
        <span className={percentChanged >= 0 ? "positive" : "negative"}>
          {percentChanged}%
        </span>
      </div>
    </div>
  );
}

export default WatchlistStock;
