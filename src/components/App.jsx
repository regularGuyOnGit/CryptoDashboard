import React, { useState } from "react";
import "../styles/App.css";
import MainDropDown from "./MainDropDown";
import Search from "./Search";
import MarketCap from "./MarketCap";
import Exchange from "./Exchange";
import Portfolip from "./Portfolip";
import MainGraph from "./MainGraph";

function App() {
  const [pageCurrency, setPageCurrency] = useState("usd");

  const changePageCurrency = (currentCurrency) => {
    setPageCurrency(currentCurrency);
  };
  return (
    <div className="dashBoardGrid">
      <MainDropDown
        currency={pageCurrency}
        changePageCurrency={changePageCurrency}
      />
      <Search />
      <MarketCap currency={pageCurrency} />
      <Exchange />
      <Portfolip />
      <MainGraph pageCurrency={pageCurrency} />
    </div>
  );
}

export default App;
