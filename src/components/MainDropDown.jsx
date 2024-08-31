import React from "react";

function MainDropDown({ currency, changePageCurrency }) {
  return (
    <div className="d-flex justify-content-center text-secondary m-2 ">
      <select
        className=" form-select w-50 text-center"
        value={currency}
        name="currencySelector"
        id="currencySelector"
        onChange={(e) => changePageCurrency(e.target.value)}
      >
        <option selected value="usd">
          USD
        </option>
        <option value="inr">INR</option>
        <option value="eur">EUR</option>
        <option value="aed">AED</option>
      </select>
    </div>
  );
}

export default MainDropDown;
