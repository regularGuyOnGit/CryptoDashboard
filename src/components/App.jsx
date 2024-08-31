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
  console.log(window.innerHeight);

  return (
    <>
      <div className="container-xxl g-0 bg-light">
        <div className="row g-2 p-0 m-0">
          <div className="col-12 p-2 col-lg-8 col-xl-7">
            <div className="row g-0 p-0 m-0 ">
              <div className="col-12 col-md-6 col-xl-4">
                <MainDropDown
                  currency={pageCurrency}
                  changePageCurrency={changePageCurrency}
                />
              </div>
              <div className="col-12 col-md-6 col-xl-8">
                <Search />
              </div>
            </div>
            <div className="row g-0 m-0 p-0 mb-2  ">
              <div className="col-12 border p-2 rounded-3 ">
                <MainGraph pageCurrency={pageCurrency} />
              </div>
            </div>
            <div className="row g-0 m-0 p-0 d-flex justify-content-around">
              <div className="col-12 col-md-6  p-2  mt-1 border rounded-3">
                {" "}
                <Portfolip />
              </div>
              <div className="col-12 col-md-5 p-2 mt-1   border rounded-3">
                <Exchange />
              </div>
            </div>
          </div>
          <div
            className="p-2 col-12 col-lg-4 col-xl-5 border rounded-3"
            style={{ height: `${window.innerHeight - 100}px` }}
          >
            <MarketCap currency={pageCurrency} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
