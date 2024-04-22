import React, { useEffect, useState, useRef } from "react";
import LineGraph from "../Graphs/LineGraph";
import "../styles/MainGraph.css";
import { options } from "../../fetchOptions";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
function MainGraph({ pageCurrency }) {
  //! Yesterday unix time stamp
  const yesterday = new Date(Date.now() - 864e5).getTime();
  const unixYesterDay = Math.floor(yesterday / 1000);
  //! 1 Week unix time stamp
  const oneWeek = new Date(Date.now() - 7 * 864e5).getTime();
  const unixOneWeek = Math.floor(oneWeek / 1000);

  //!  1 Month unix time stamp
  const oneMonth = new Date(Date.now() - 30 * 864e5).getTime();
  const unixOneMonth = Math.floor(oneMonth / 1000);

  //!  6 Month unix time stamp
  const sixMonths = new Date(Date.now() - 180 * 864e5).getTime();
  const unixSixMonths = Math.floor(sixMonths / 1000);

  //!  1 year unix time stamp
  const year = new Date(Date.now() - 365 * 864e5).getTime();
  const unixYear = Math.floor(year / 1000);

  const [DisplayCoinData, setDisplayCoinData] = useState();
  const [coinData, setCoinData] = useState(null);
  const [fromUnix, setFromUnix] = useState(unixYesterDay);
  const [duration, setDuration] = useState("1DAY");
  const [graph, setGraph] = useState("line");
  const [coin, setCoin] = useState("bitcoin");

  // console.log(DisplayCoinData, coinData, fromUnix, duration, graph, coin);
  //?btn classState
  const [oneDay, setOneDay] = useState("active");
  const [oneWeekT, setOneWeekT] = useState(null);
  const [oneMonthT, setOneMonthT] = useState(null);
  const [sixMonth, setSixMonth] = useState(null);
  const [oneYear, setOneYear] = useState(null);

  useEffect(() => {
    const coinsHistory = async () => {
      const currentTimeInMiliseconds = new Date().getTime();
      const currentUnix = Math.floor(currentTimeInMiliseconds / 1000);
      try {
        const rawData = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=${pageCurrency}&from=${fromUnix}&to=${currentUnix}&precision=1`,
          options
        );
        const data = await rawData.json();
        setCoinData(data);
      } catch {
        console.log("error");
      }
    };
    coinsHistory();
  }, [fromUnix, coin, pageCurrency]);

  function msToTime(duration) {
    let minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes;
  }

  function msToDay(duration) {
    const date = new Date(duration);
    const dayOfWeek = date.getDay(); // This will return a number from 0 (Sunday) to 6 (Saturday)

    // You can use an array to map the day number to its name
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayOfWeek];
  }

  function msToMonth(duration) {
    const timestamp = duration; // Your timestamp in milliseconds
    const date = new Date(timestamp);

    // Extracting the month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];

    // Extracting the date
    const day = date.getDate();

    return day + " " + month;
  }
  function msToMonths(duration) {
    const timestamp = duration; // Your timestamp in milliseconds
    const date = new Date(timestamp);

    // Extracting the month name
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];

    return month;
  }
  useEffect(() => {
    if (coinData && duration == "1DAY") {
      const unixTimestamp = coinData.prices.filter((array, index) => {
        if (index % 12 == 0) {
          return array;
        }
      });
      const normalization = (array) => {
        // It returns an array of normalized data time.
        const unixTimestampF = array.map((items) => items[0]);
        const labelTime = unixTimestampF.map((item) => msToTime(item));

        return labelTime;
      };
      const normalizedTimeData = normalization(unixTimestamp);
      const normalizedCoinData = unixTimestamp.map((item) => item[1]);
      // console.log(normalizedCoinData);
      setDisplayCoinData({
        labels: normalizedTimeData.map((time) => time),
        datasets: [
          {
            label: "Coins Value",
            data: normalizedCoinData.map((coins) => coins),
            borderWidth: 1,
            // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
          },
        ],
      });
    } else if (coinData && duration == "1WEEK") {
      const unixTimestamp = coinData.prices.filter((array, index) => {
        if (index % 25 == 0) {
          return array;
        }
      });
      const normalization = (array) => {
        // It returns an array of normalized data time.
        const unixTimestampF = array.map((items) => items[0]);
        const labelTime = unixTimestampF.map((item) => msToDay(item));

        return labelTime;
      };
      const normalizedTimeData = normalization(unixTimestamp);
      const normalizedCoinData = unixTimestamp.map((item) => item[1]);
      // console.log(normalizedCoinData);
      setDisplayCoinData({
        labels: normalizedTimeData.map((time) => time),
        datasets: [
          {
            label: "Coins Value",
            data: normalizedCoinData.map((coins) => coins),
            borderWidth: 1,
            // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
          },
        ],
      });
    } else if (coinData && duration == "1MONTH") {
      const unixTimestamp = coinData.prices.filter((array, index) => {
        if (index % 200 == 0) {
          return array;
        }
      });

      const normalization = (array) => {
        // It returns an array of normalized data time.
        const unixTimestampF = array.map((items) => items[0]);
        // console.log(unixTimestampF);
        const labelTime = unixTimestampF.map((item) => msToMonth(item));

        return labelTime;
      };
      const normalizedTimeData = normalization(unixTimestamp);
      const normalizedCoinData = unixTimestamp.map((item) => item[1]);
      // console.log(normalizedCoinData);
      setDisplayCoinData({
        labels: normalizedTimeData.map((time) => time),
        datasets: [
          {
            label: "Coins Value",
            data: normalizedCoinData.map((coins) => coins),
            borderWidth: 1,
            // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
          },
        ],
      });
    } else if (coinData && duration == "6MONTHS") {
      const unixTimestamp = coinData.prices.filter((array, index) => {
        if (index % 30 == 0) {
          return array;
        }
      });
      const normalization = (array) => {
        // It returns an array of normalized data time.
        const unixTimestampF = array.map((items) => items[0]);
        // console.log(unixTimestampF);
        const labelTime = unixTimestampF.map((item) => msToMonths(item));

        return labelTime;
      };
      const normalizedTimeData = normalization(unixTimestamp);
      const normalizedCoinData = unixTimestamp.map((item) => item[1]);
      // console.log(normalizedCoinData);
      setDisplayCoinData({
        labels: normalizedTimeData.map((time) => time),
        datasets: [
          {
            label: "Coins Value",
            data: normalizedCoinData.map((coins) => coins),
            borderWidth: 1,
            // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
          },
        ],
      });
    } else if (coinData && duration == "1YEAR") {
      const unixTimestamp = coinData.prices.filter((array, index) => {
        if (index % 32 == 0) {
          return array;
        }
      });
      const normalization = (array) => {
        // It returns an array of normalized data time.
        const unixTimestampF = array.map((items) => items[0]);
        const labelTime = unixTimestampF.map((item) => msToMonths(item));

        return labelTime;
      };
      const normalizedTimeData = normalization(unixTimestamp);
      const normalizedCoinData = unixTimestamp.map((item) => item[1]);
      // console.log(normalizedCoinData);
      setDisplayCoinData({
        labels: normalizedTimeData.map((time) => time),
        datasets: [
          {
            label: "Coins Value",
            data: normalizedCoinData.map((coins) => coins),
            borderWidth: 1,
            // backgroundColor: ["pink", "red", "lightBlue", "black", "gray"],
          },
        ],
      });
    }
  }, [coinData, duration]);

  function buttonHandlers(duration, writtenDuration) {
    setFromUnix(duration);
    setDuration(writtenDuration);
  }
  function addClassOne() {
    setOneDay("active");
    setOneWeekT(null);
    setOneMonthT(null);
    setSixMonth(null);
    setOneYear(null);
  }
  function addClassTwo() {
    setOneDay(null);
    setOneWeekT("active");
    setOneMonthT(null);
    setSixMonth(null);
    setOneYear(null);
  }
  function addClassThree() {
    setOneDay(null);
    setOneWeekT(null);
    setOneMonthT("active");
    setSixMonth(null);
    setOneYear(null);
  }
  function addClassfour() {
    setOneDay(null);
    setOneWeekT(null);
    setOneMonthT(null);
    setSixMonth("active");
    setOneYear(null);
  }
  function addClassfive() {
    setOneDay(null);
    setOneWeekT(null);
    setOneMonthT(null);
    setSixMonth(null);
    setOneYear("active");
  }

  return (
    <div className="mainGraph">
      <div className="btnAndDropdowns">
        {" "}
        <div className="dayBtns">
          <button
            className={`${oneDay}`}
            onClick={() => {
              buttonHandlers(unixYesterDay, "1DAY");
              addClassOne();
            }}
          >
            1D
          </button>
          <button
            className={`${oneWeekT}`}
            onClick={() => {
              buttonHandlers(unixOneWeek, "1WEEK");
              addClassTwo();
            }}
          >
            1W
          </button>
          <button
            className={`${oneMonthT}`}
            onClick={() => {
              buttonHandlers(unixOneMonth, "1MONTH");
              addClassThree();
            }}
          >
            1M{" "}
          </button>
          <button
            className={`${sixMonth}`}
            onClick={() => {
              buttonHandlers(unixSixMonths, "6MONTHS");
              addClassfour();
            }}
          >
            6M
          </button>
          <button
            className={`${oneYear}`}
            onClick={() => {
              buttonHandlers(unixYear, "1YEAR");
              addClassfive();
            }}
          >
            1Y
          </button>
        </div>
        <div className="graphTypeAndCrypto">
          <select
            onChange={(e) => setCoin(e.target.value)}
            name="coin"
            id="coin"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="binancecoin">Binance coin</option>
          </select>

          <select
            name="graphType"
            id="graphType"
            onChange={(e) => setGraph(e.target.value)}
          >
            <option value="line">Line</option>
            <option value="bar">Bar</option>
          </select>
        </div>
      </div>
      {DisplayCoinData && <LineGraph data={DisplayCoinData} graph={graph} />}
    </div>
  );
}

export default MainGraph;
