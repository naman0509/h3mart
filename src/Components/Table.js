import React, { useEffect, useState } from "react";
import "../Components/Styles/table.css";

const renderData = (fetchData) => {
  const symbol = (itemSymbol) => {
    var coin = itemSymbol.toLowerCase();
    var urlhead = "https://assets.coincap.io/assets/icons/";
    var urltail = "@2x.png";
    var url = urlhead + coin + urltail;
    return url;
  };
  return (
    <table className="dataTable">
      <thead>
        <tr className="dataheading">
          <td> </td>
          <td>Rank</td>
          <td className="table-name-column">Name</td>
          <td></td>
          <td>Price</td>
          <td>Market Cap</td>
          <td>VWAP(24Hr)</td>
          <td>Supply</td>
          <td>Volume(24Hr)</td>
          <td>Change(24Hr)</td>
        </tr>
      </thead>
      <tbody>
        {fetchData && fetchData.length > 0
          ? fetchData.map((el) => {
              return (
                <tr className="td" key={el.rank}>
                  <td> </td>
                  <td>{el.rank}</td>
                  <td className="table-logo-column">
                    <img
                      className="coinLogo"
                      src={symbol(el.symbol)}
                      alt="coinLogo"
                      height="49"
                      width="49"
                    />
                  </td>

                  <td className="table-name-data-column">
                    <span id="content1" style={{ fontSize: "10.0pt" }}>
                      {el.name}
                    </span>
                    <span
                      id="content2"
                      style={{ fontSize: "8.0pt", color: " rgb(97, 100, 103)" }}
                    >
                      {el.symbol}
                    </span>
                  </td>
                  <td>${(el.priceUsd / 1).toFixed(2)}</td>
                  <td>${(el.marketCapUsd / 1000000000).toFixed(2)}b</td>
                  <td>${(el.vwap24Hr / 1).toFixed(2)}</td>
                  <td>{(el.supply / 1000000).toFixed(2)}m</td>
                  <td>${(el.volumeUsd24Hr / 1000000000).toFixed(2)}b</td>
                  <td>{(el.changePercent24Hr / 1).toFixed(2)}%</td>
                </tr>
              );
            })
          : " Data Not Found"}
      </tbody>
    </table>
  );
};

function Table() {
  const [data, setData] = useState([]);

  const [present, setPresent] = useState(1);
  const [item] = useState(50);

  const [noL] = useState(5);
  const [maxNoL, setmaxNoL] = useState(5);
  const [minNoL, setminNoL] = useState(0);

  const handleClick = (event) => {
    setPresent(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / item); i++) {
    pages.push(i);
  }

  const lastIndex = present * item;
  const firstIndex = lastIndex - item;
  const presentEl = data.slice(firstIndex, lastIndex);

  const renderPnum = pages.map((number) => {
    if (number < maxNoL + 1 && number > minNoL) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={present === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const fetchFunc = () => {
    return fetch("https://api.coincap.io/v2/assets")
      .then((response) => response.json())
      .then((json) => setData(json.data));
  };
  useEffect(() => {
    fetchFunc();
  }, []);

  const callNext = () => {
    setPresent(present + 1);

    if (present + 1 > maxNoL) {
      setmaxNoL(maxNoL + noL);
      setminNoL(minNoL + noL);
    }
  };

  const callPre = () => {
    setPresent(present - 1);

    if ((present - 1) % noL === 0) {
      setmaxNoL(maxNoL - noL);
      setminNoL(minNoL - noL);
    }
  };

  let incButton = null;
  if (pages.length > maxNoL) {
    incButton = <li onClick={callNext}> &hellip; </li>;
  }

  let decButton = null;
  if (minNoL >= 1) {
    decButton = <li onClick={callPre}> &hellip; </li>;
  }

  return (
    <div>
      {renderData(presentEl)}
      <ul className="tablenumbering">
        <li>
          <button
            onClick={callPre}
            disabled={present === pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {decButton}
        {renderPnum}
        {incButton}

        <li>
          <button
            onClick={callNext}
            disabled={present === pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Table;
