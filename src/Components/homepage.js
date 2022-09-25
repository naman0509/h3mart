import React from "react";
import { FaSearch, FaCog } from "react-icons/fa";
import coincap from "../coincap.png";
import "../Components/Styles/homepage.css";
import Table from "./Table";
import footer from "../footer.png";

function HeaderPage() {
  return (
    <div>
      <div className="header">
        <h7 className="E1">Coins </h7>
        <h7 className="E2">Exchanges</h7>
        <h7 className="E3">Swap</h7>
        <img src={coincap} alt="logo" className="CMl"></img>
        <FaSearch className="find" />
        <FaCog className="set">setting</FaCog>
        <button className="Wal">connect Wallet</button>
      </div>

      <section className="Table-header">
        <h5 className="header1">
          <span id="content1">MARKET CAP</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            $1.14T
          </span>
        </h5>
        <h5 className="header-2">
          <span id="content1">EXCHANGE VOL</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            $34.09B
          </span>
        </h5>
        <h5 className="header-3">
          <span id="content1">ASSETS</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            2,295
          </span>
        </h5>
        <h5 className="header-4">
          <span id="content1">EXCHANGES</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            73
          </span>
        </h5>
        <h5 className="header-5">
          <span id="content1">MARKETS</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            14,092
          </span>
        </h5>
        <h5 className="header-6">
          <span id="content1">DOM INDEX</span>
          <span id="content2" style={{ fontSize: "15.0pt" }}>
            32.0%
          </span>
        </h5>
      </section>

      <Table />

      <footer className="page-end">
        <img className="footerimg" src={footer} />
      </footer>
    </div>
  );
}

export default HeaderPage;
