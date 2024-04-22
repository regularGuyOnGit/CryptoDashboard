import React from "react";
import "../styles/searchBar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { options } from "../../fetchOptions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";

function Search() {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState(null);
  const input = (event) => {
    setUserInput(event.target.value);
  };
  useEffect(() => {
    const searchData = async () => {
      const rawData = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${userInput}`,
        options
      );
      const data = await rawData.json();
      setData(data);
    };
    searchData();
  }, [userInput]);
  console.log(userInput);
  console.log(data);
  return (
    <div className="searchBar">
      <form
        action=""
        onChange={(e) => input(e)}
        onClick={(e) => e.preventDefault()}
      >
        <input
          type="text"
          name="coinSearch"
          id="coinSearch"
          placeholder="Search Coins"
          value={userInput}
        />
        <Link to={"coinDetails"} state={{ data }}>
          <button disabled={userInput ? false : true}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Search;
