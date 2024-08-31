import React, { useEffect, useState } from "react";

function Exchange() {
  const [primary, setPrimary] = useState("btc");
  const [secondary, setSecondary] = useState("aed");
  const [value, setValue] = useState(1);
  const [fetchedVal, setFetchedVal] = useState(null);
  const [displayVal, setDisplayVal] = useState(null);

  useEffect(() => {
    (async () => {
      const rawData = await fetch(
        `https://api.coingecko.com/api/v3/exchange_rates`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-p4pbRGEt9G8v9ABzNd1puF1Y	",
          },
        }
      );
      const data = await rawData.json();
      setFetchedVal(data);
    })();
  }, []);

  const amountConversion = () => {
    if (fetchedVal) {
      setDisplayVal(
        fetchedVal.rates[`${secondary}`].value * value + " " + secondary
      );
    }
  };
  return (
    <div className=" mb-2">
      <h3 className="text-center heading-font">Exchange Coins</h3>
      <div className=" d-flex justify-content-around mb-2">
        <label className="m-2" htmlFor="primaryCurrency">
          {" "}
          Sell
        </label>
        <select
          className="form-select"
          onChange={(e) => setPrimary(e.target.value)}
          value={primary}
          name="primaryCurrency"
          id="primaryCurrency"
        >
          <option value="btn">Bitcoin</option>
        </select>
      </div>
      <div className="d-flex justify-content-around mb-2">
        <label className="m-2" htmlFor="secondaryCurrency">
          {" "}
          Buy{" "}
        </label>

        <select
          className="form-select"
          onChange={(e) => setSecondary(e.target.value)}
          value={secondary}
          name="secondaryCurrency"
          id="secondaryCurrency"
        >
          <option selected value="aed">
            AED
          </option>
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
      </div>
      <div className="d-flex justify-content-between mb-2">
        <label className="m-2" htmlFor="currencyAmt">
          Enter Amount
        </label>
        <input
          type="number"
          className="form-control w-50"
          name="currencyAmt"
          id="currencyAmt"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <div
        className="text-center "
        style={{ fontFamily: "cursive", fontWeight: "bold" }}
      >
        {displayVal ? `Exhanged Amount is ${displayVal}` : ``}
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={amountConversion}
          className="btn btn-success mt-2 mb-2 rounded"
        >
          Exchange
        </button>
      </div>
    </div>
  );
}

export default Exchange;
