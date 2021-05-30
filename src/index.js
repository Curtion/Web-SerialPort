import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import App from "./app.js";
import "antd/dist/antd.css";
import "./index.css";
import { message } from "antd";
navigator.serial.addEventListener("connect", (e) => {
  message.success("设备已连接");
});
navigator.serial.addEventListener("disconnect", (e) => {
  message.error("设备已断开");
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
