import React, { useState, useEffect } from "react";
import "../styles/portfolio.css";
import PieChartPortfolio from "../Graphs/PieChartPortfolio";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

function Portfolip() {
  const Data = [
    { name: "BitCoin", value: 946 },
    { name: "Etherium", value: 45 },
    { name: "Binance Coin", value: 9 },
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
    return <div className="portfolio"></div>;
  }
  return (
    <div className="portfolio">
      <h2>Portfolio</h2>
      <div className="pieChartPortfolio">
        <PieChartPortfolio data={data} />
      </div>
    </div>
  );
}

export default Portfolip;
