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

import { Bar } from 'react-chartjs-2';

const LineChartProject = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: '369',
                data: [3, 6, 9],
                backgroundColor: 'red', 
            }
        ],
    };

    const options = { }
  return <div style={{backgroundColor: 'white'}}>
    <Bar 
        style={{padding: '12px', width: '100%'}}
        data={data} 
        options={options}
    ></Bar>
  </div>;
};

export default LineChartProject;
