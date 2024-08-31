import React from "react";
import { Pie } from "react-chartjs-2";

function PieChartPortfolio({ data }) {
  return (
    <div className="p-4 ">
      <Pie
        className=""
        data={data}
        options={{
          elements: {},
          plugins: {
            legend: {
              position: "right",
              labels: {
                padding: 10,
                pointStyle: "circle",
                color: "rgb(12, 12, 12)",
                font: {
                  size: 14,
                  weight: 600,
                  family: "Arial",
                },
                usePointStyle: true,
              },
            },
            title: {
              display: true,
              text: "Coins market share",
              color: "rgb(12, 12, 12)",
              font: {
                size: 14,
                weight: 600,
                family: "Arial",
              },
            },
          },
        }}
      />
      <div>
        <p style={{ paddingLeft: "2rem", color: "red" }}>
          {" "}
          &#9670;Market Share
        </p>
      </div>
    </div>
  );
}

export default PieChartPortfolio;
