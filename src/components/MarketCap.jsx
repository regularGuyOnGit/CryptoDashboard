import React, { useState, useEffect } from "react";

import { options } from "../../fetchOptions";

function MarketCap({ currency }) {
  const [mktCap, setMktCap] = useState(null);

  useEffect(() => {
    (async () => {
      const mktCapRawData = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&category=layer-1&per_page=40`,
        options
      );
      const mktCapData = await mktCapRawData.json();
      setMktCap(mktCapData);
    })();
  }, [currency]);
  // console.log(mktCap);
  if (mktCap == null) {
    return <div className="">....Loading</div>;
  }
  return (
    <div className="d-flex flex-column h-100 overflow-auto  mb-2">
      <h2 className="heading-font text-center p-1">
        Cryptocurrency By Market Cap
      </h2>
      {mktCap.map((coins) => {
        return (
          <div className="" key={coins.id}>
            <div>
              <div className="fs-4 fw-bold text-font">{coins.name}</div>
              <div className=" d-flex justify-content-between">
                <span
                  style={{
                    color: "rgb(117, 116, 116)",
                    fontFamily: "sans-serif",
                    fontStyle: "italic",
                    fontSize: "1.1rem",
                    fontWeight: "bolder",
                  }}
                >
                  {" "}
                  Mkt.Cap:
                  {currency == "usd"
                    ? "$" + " " + coins.market_cap
                    : currency == "inr"
                    ? "₹" + " " + coins.market_cap
                    : currency == "eur"
                    ? "€" + " " + coins.market_cap
                    : currency == "aed"
                    ? "aed" + " " + coins.market_cap
                    : null}
                </span>

                {coins.market_cap_change_percentage_24h < 0 ? (
                  <div
                    className="fw-bold"
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
                    className="fw-bold"
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
            <div></div>
          </div>
        );
      })}
    </div>
  );
}

export default MarketCap;
