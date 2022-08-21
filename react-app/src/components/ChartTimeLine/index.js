import React from "react";
import "./ChartTimeLine.css";

function ChartTimeLine({ handleClick, time }) {
  return (
    <div className="chart-time-container">
      <div className="chart-time-btns">
        <div
          className={`time-btn ${time === "Live" && "active"}`}
          onClick={() => handleClick("Live")}
        >
          LIVE
        </div>
        <div
          className={`time-btn ${time === "1W" && "active"}`}
          onClick={() => handleClick("1W")}
        >
          1W
        </div>
        <div
          className={`time-btn ${time === "1M" && "active"}`}
          onClick={() => handleClick("1M")}
        >
          1M
        </div>
        <div
          className={`time-btn ${time === "3M" && "active"}`}
          onClick={() => handleClick("3M")}
        >
          3M
        </div>
        <div
          className={`time-btn ${time === "1Y" && "active"}`}
          onClick={() => handleClick("1Y")}
        >
          1Y
        </div>
      </div>
    </div>
  );
}

export default ChartTimeLine;
