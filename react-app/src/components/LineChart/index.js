import React, { useEffect, useState } from "react";
import ChartTimeLine from "../ChartTimeLine";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
);

function LineChart({ labels, prices }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  // console.log("IN LINECHART", "labels:", labels, "prices", prices);

  const [chartOptions, setChartOptions] = useState();

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          data: prices,
          type: "line",
          backgroundColor: "black",
          borderColor: "#5AC53B",
          borderWidth: 2,
          pointBorderColor: "rgba(0, 0, 0, 0)",
          pointBackgroundColor: "rgba(0, 0, 0, 0)",
          pointHoverBackgroundColor: "#5AC53B",
          pointHoverBorderColor: "#000000",
          pointHoverBorderWidth: 4,
          pointHoverRadius: 6,
        },
      ],
    });

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      hover: {
        intersect: false,
      },
      elements: {
        line: {
          tension: 0,
        },
        point: {
          radius: 0,
        },
      },
      maintainAspectRatio: false,
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {},
      },
      scales: {
        x: {
          display: false,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          grid: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Line options={chartOptions} data={chartData} />
    </>
  );
}

export default LineChart;
