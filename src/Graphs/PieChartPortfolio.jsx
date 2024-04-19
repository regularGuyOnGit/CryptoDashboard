import React from "react";
import { Pie } from "react-chartjs-2";

function PieChartPortfolio({ data }) {
  return (
    <div className="portPie">
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Coins market share",
            },
          },
        }}
      />
      <div>
        <p> &#9670;Market Share</p>
      </div>
    </div>
  );
}

export default PieChartPortfolio;
