import React, { useState } from "react";

import PieChartPortfolio from "../Graphs/PieChartPortfolio";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Portfolip() {
  const Data = [
    { name: "BitCoin", value: 800 },
    { name: "Etherium", value: 150 },
    { name: "Binance Coin", value: 50 },
  ];
  const [data, setData] = useState({
    labels: Data.map((coins) => coins.name),
    datasets: [
      {
        label: "Mkt Share",
        data: Data.map((coins) => coins.value),
        borderWidth: 1,
        // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
      },
    ],
  });

  if (!Data) {
    return <div className="portfolio border mb-2"></div>;
  }
  return (
    <div className="">
      <h2 className="text-center heading-font">Portfolio</h2>
      <div className=" h-75 d-flex justify-content-center">
        <PieChartPortfolio data={data} />
      </div>
    </div>
  );
}

export default Portfolip;
