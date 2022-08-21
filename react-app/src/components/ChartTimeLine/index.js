import React from "react";
import "./ChartTimeLine.css";

function ChartTimeLine() {
  return (
    <div className="chart-time-container">
      <div className="chart-time-btns">
        <div className="time-btn">LIVE</div>
        <div className="time-btn">1D</div>
        <div className="time-btn active">1W</div>
        <div className="time-btn">3M</div>
        <div className="time-btn">1Y</div>
      </div>
    </div>
  );
}

export default ChartTimeLine;
