import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { options } from "../../fetchOptions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";

function Search() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();
  // User currency Input.
  const input = (event) => {
    setUserInput(event.target.value);
  };

  // Function to fetch the results of the crypto-currency

  async function fetchCurrencyDetails() {
    try {
      const rawData = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${userInput}`,
        options
      );
      const data = await rawData.json();
      if (rawData.status == 200 && userInput !== "") {
        console.log("worked redirect ");

        navigate("coinDetails", {
          state: {
            data: data,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="m-2 ">
      <form
        onChange={(e) => input(e)}
        className="w-100 d-flex justify-content-center"
      >
        <input
          className="w-75 form-control p-2"
          type="text"
          name="coinSearch"
          id="coinSearch"
          placeholder="Search Coins"
          value={userInput}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            fetchCurrencyDetails();
          }}
          className="btn btn-primary ms-1"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </div>
  );
}

export default Search;
