import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { mainColor, whiteColor } from "@/utils/app_color";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartProjects = ({ myProp: props }: any) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.labelDatasets,
        data: props.data,
        backgroundColor: props.backgroundColors,
        borderColor: props.borderColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
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
          <div
            style={{
              padding: "6px 8px",
              borderRadius: "4px",
              backgroundColor: mainColor,
              color: whiteColor,
            }}
          >
            {props.title}
          </div>
        </div>
        <Pie style={{ padding: "12px", width: "100%" }} data={data} />
      </div>
    </>
  );
};

export default PieChartProjects;
