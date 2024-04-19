import React from "react";
import "../styles/mainDropDown.css";
function MainDropDown({ currency, changePageCurrency }) {
  return (
    <div className="mainDropDown">
      <select
        value={currency}
        name="currencySelector"
        id="currencySelector"
        onChange={(e) => changePageCurrency(e.target.value)}
      >
        <option value="usd">USD</option>
        <option value="inr">INR</option>
        <option value="eur">EUR</option>
        <option value="aed">AED</option>
      </select>
    </div>
  );
}

export default MainDropDown;
