"use client";
import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function LineChart() {
  return (
    <div>
      <h2>Bar Example (custom size)</h2>
      <div>
        <Line
          data={{
            labels: [
              "2023-01",
              "2023-02",
              "2023-03",
              "2023-04",
              "2023-05",
              "2023-06",
              "2023-07",
            ],
            datasets: [
              {
                data: [100, 120, 115, 134, 168, 132, 200],
                backgroundColor: "purple",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
;