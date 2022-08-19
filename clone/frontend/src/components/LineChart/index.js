import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function LineChart() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState();

  useEffect(() => {
    setChartData({
      labels: [
        "John",
        "Kevin",
        "George",
        "Oreo",
        "John",
        "Kevin",
        "George",
        "Oreo",
      ],
      datasets: [
        {
          label: "Who let the dogs out",
          data: [12, 55, 34, 120, 44, 78, 8, 289],
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
    <div>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}

export default LineChart;
