import React from "react";
import { Link, useLocation } from "react-router-dom";

function CoinDetails() {
  const location = useLocation();
  const { data } = location.state;
  console.log(data);
  console.log(data.coins);
  if (data.coins.length == 0) {
    return (
      <div className="errorSearch">
        <h3>
          The page you're looking for doesn't exist. Please verify the coin
          you're searching for.
        </h3>
        <Link to={"/"}>Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="coinPage">
      <h1>{data.coins[0].name}</h1>
      <img src={data.coins[0].large} alt="bitcoinImage" />
      <h3>Symbol : {data.coins[0].symbol}</h3>
      <h3>Market Cap Rank : {data.coins[0].market_cap_rank}</h3>
      <Link to={"/"}>Return to Dashboard</Link>
    </div>
  );
}

export default CoinDetails;
