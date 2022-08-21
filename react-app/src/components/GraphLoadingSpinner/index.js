import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./GraphLoadingSpinner.css";

function GraphLoadingSpinner() {
  return (
    <div className="graph-loading-container">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="8%"
        visible={true}
      />
    </div>
  );
}

export default GraphLoadingSpinner;
