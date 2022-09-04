import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Componants/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// to Select our Route Element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Config BrowserRouter To handel all Route on our Website
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
