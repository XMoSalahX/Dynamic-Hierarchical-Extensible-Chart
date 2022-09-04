import logo from "./logo.svg";
import "./App.css";
import Chart from "../Chart/index";
import { useState, useEffect } from "react";
import Start from "../Start";
import { Routes, Route } from "react-router-dom";
import NodeControler from "../NodeControler/NodeControler";
import { config } from "../../config/config";

// App Componat to handel Route {TO Home If we Have data on our DB, Or TO Our Start Button to Start on Home too, OR To Our Node Controler}
function App() {
  const [chart, setChart] = useState([]);
  useEffect(() => {
    const ChartFromServer = async () => {
      const response = await fetch(`${config.server}/alldata`, {
        method: "GET",
      });
      let data = await response.json();

      // To Request our Data One time iF we don't have
      if (chart.length === 0) {
        setChart(data);
      }
    };

    ChartFromServer();
  }, [chart]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* Go To Load Page to Request Our Date */}
            {chart.length === 0 ? (
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>Waiting for server response....</p>
                </header>
              </div>
            ) : // TO Check We Have Data Or Not and Go To the Right Comonant
            chart[0] === null ? (
              <Start setChart={setChart} chart={chart} />
            ) : (
              <Chart chartData={chart} />
            )}
          </>
        }
      />
      {/* To Controle Our Root */}
      <Route
        path="/nodeControler"
        element={
          <>
            <NodeControler />
          </>
        }
      />
    </Routes>
  );
}

export default App;
