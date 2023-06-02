import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { Bar } from "react-chartjs-2";

const LineChartProject = ({ myProp: props }: any) => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: props.label,
        data: props.data,
        backgroundColor: props.colorChart,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };
  return (
    <div style={{ backgroundColor: "white", padding: "12px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          padding: "12px 0",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {props.title}
      </div>
      <Bar
        style={{ padding: "12px", width: "100%" }}
        data={data}
        options={options}
      ></Bar>
    </div>
  );
};

export default LineChartProject;
