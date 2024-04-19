import React, { useState, useEffect } from "react";
import "../styles/marketCap.css";
import { options } from "../../fetchOptions";

function MarketCap({ currency }) {
  const [mktCap, setMktCap] = useState(null);
  useEffect(() => {
    const mktCapFetch = async () => {
      const mktCapRawData = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=layer-1&per_page=40`,
        options
      );
      const mktCapData = await mktCapRawData.json();
      setMktCap(mktCapData);
    };
    mktCapFetch();
  }, [currency]);
  // console.log(mktCap);
  if (mktCap == null) {
    return <div className="loaderMktCap">....Loading</div>;
  }
  return (
    <div className="marketCap">
      <h2 style={{ textAlign: "center", padding: "1rem" }}>
        Cryptocurrency By Market Cap
      </h2>
      {mktCap.map((coins) => {
        return (
          <div className="coins" key={coins.id}>
            <div>
              <div>{coins.name}</div>
              <div>
                <span
                  style={{
                    color: "rgb(117, 116, 116)",
                    fontFamily: "sans-serif",
                    fontStyle: "italic",
                    fontSize: "1.2rem",
                    fontWeight: "bolder",
                  }}
                >
                  {" "}
                  Mkt.Cap:
                </span>{" "}
                {" " + " "}
                {currency == "usd"
                  ? "$" + " " + coins.market_cap
                  : currency == "inr"
                  ? "₹" + " " + coins.market_cap
                  : currency == "eur"
                  ? "€" + " " + coins.market_cap
                  : currency == "aed"
                  ? "aed" + " " + coins.market_cap
                  : null}
              </div>
            </div>
            <div>
              {coins.market_cap_change_percentage_24h < 0 ? (
                <div
                  style={{
                    color: "rgb(205, 24, 24)",
                    padding: "0.3rem ",
                  }}
                >
                  <span>&#x25B2;</span>
                  {Math.round(coins.market_cap_change_percentage_24h * 100) /
                    100}{" "}
                  %
                </div>
              ) : (
                <div
                  style={{
                    color: "rgb(65, 109, 25)",
                    padding: "0.3rem ",
                  }}
                >
                  <span>&#x25B2;</span>
                  {Math.round(coins.market_cap_change_percentage_24h * 100) /
                    100}{" "}
                  %{" "}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MarketCap;
