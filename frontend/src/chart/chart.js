import React from "react";
import { Line } from "react-chartjs-2";

function Chart({ chartData }) {
  return (
    <Line
      data={chartData}
      options={{
        responsive: "true",
        scales: {
          yAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20,
              },
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                autoSkip: true,
                maxTicksLimit: 20,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      }}
    />
  );
}

export default Chart;
