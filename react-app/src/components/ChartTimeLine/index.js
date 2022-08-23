import React from "react";
import "./ChartTimeLine.css";

function ChartTimeLine({ handleClick, time, delta }) {
  return (
    <div className="chart-time-container">
      <div className="chart-time-btns">
        <div
          className={`time-btn ${time === "Live" && "active"} ${delta < 0? "red" : "green"}`}
          onClick={() => handleClick("Live")}
        >
          LIVE
        </div>
        <div
          className={`time-btn ${time === "1W" && "active"} ${delta < 0? "red" : "green"}`}
          onClick={() => handleClick("1W")}
        >
          1W
        </div>
        <div
          className={`time-btn ${time === "1M" && "active"} ${delta < 0? "red" : "green"}`}
          onClick={() => handleClick("1M")}
        >
          1M
        </div>
        <div
          className={`time-btn ${time === "3M" && "active"} ${delta < 0? "red" : "green"}`}
          onClick={() => handleClick("3M")}
        >
          3M
        </div>
        <div
          className={`time-btn ${time === "1Y" && "active"} ${delta < 0? "red" : "green"}`}
          onClick={() => handleClick("1Y")}
        >
          1Y
        </div>
      </div>
    </div>
  );
}

export default ChartTimeLine;
