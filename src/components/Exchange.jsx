import React, { useEffect, useState } from "react";
import "../styles/exchange.css";

function Exchange() {
  const [primary, setPrimary] = useState("btc");
  const [secondary, setSecondary] = useState("eth");
  const [value, setValue] = useState(1);
  const [fetchedVal, setFetchedVal] = useState(null);
  const [displayVal, setDisplayVal] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-p4pbRGEt9G8v9ABzNd1puF1Y	",
    },
  };

  useEffect(() => {
    const fetchCurrencyExchange = async () => {
      const rawData = await fetch(
        `https://api.coingecko.com/api/v3/exchange_rates`,
        options
      );
      const data = await rawData.json();
      setFetchedVal(data);
    };
    fetchCurrencyExchange();
  }, []);

  const amountConversion = () => {
    if (fetchedVal) {
      setDisplayVal(fetchedVal.rates[`${secondary}`].value * value);
    }
  };
  return (
    <div className="exchange">
      <h3>Exchange Coins</h3>
      <div className="primary">
        <span>
          Sell :{" "}
          <select
            onChange={(e) => setPrimary(e.target.value)}
            value={primary}
            name="primaryCurrency"
            id="primaryCurrency"
          >
            <option value="btn">Bitcoin</option>
          </select>
        </span>
        <label htmlFor="currencyAmt">
          {" "}
          Enter Amt :{" "}
          <input
            type="number"
            name="currencyAmt"
            id="currencyAmt"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </label>
      </div>
      <div className="secondary">
        <span>
          <span>
            {" "}
            Buy :{" "}
            <select
              onChange={(e) => setSecondary(e.target.value)}
              value={secondary}
              name="secondaryCurrency"
              id="secondaryCurrency"
            >
              <option value="aed">AED</option>
              <option value="ars">Argentine Peso</option>
              <option value="usd">USD</option>
              <option value="inr">INR</option>
              <option value="bits">Bits</option>
              <option value="eur">EUR</option>
              <option value="bnb">Binance Coin</option>
              <option value="dot">Polkadot</option>
              <option value="sats">Satoshi</option>
              <option value="link">Chainlink</option>
              <option value="xlm">Lumens</option>
              <option value="xrp">XRP</option>
            </select>
          </span>
        </span>
        <div>
          {" "}
          {displayVal} {"  "}
        </div>
      </div>
      <button onClick={amountConversion} className="exchangeBtn">
        Exchange
      </button>
    </div>
  );
}

export default Exchange;
