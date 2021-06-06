import { Component } from "react";
import { hex2a } from "./ullti.js";
import "./index.css";
export default class Read extends Component {
  renderLi() {
    const type = this.props.readType;
    return this.props.value.map((item, index) => {
      let body = [];
      if (item === undefined) {
        body.push("");
      } else {
        let strArr = [];
        for (let hex of Array.from(item)) {
          strArr.push(hex.toString(16).toLocaleUpperCase());
        }
        if (strArr.includes("D") && strArr.includes("A")) {
          if (strArr.indexOf("A") - strArr.indexOf("D") === 1) {
            strArr.splice(strArr.indexOf("D"), 1);
            strArr.splice(strArr.indexOf("A"), 1, <br />);
          }
        }
        strArr = strArr.map((item) => {
          if (typeof item === "string") {
            if (type === 1) {
              return hex2a(parseInt(item, 16));
            } else if (type === 2) {
              return item + " ";
            }
          }
          return item;
        });
        body.push(strArr);
      }
      return (
        <span className="py-3" key={index}>
          {body}
        </span>
      );
    });
  }
  render() {
    return <div className="break-all text-xl">{this.renderLi()}</div>;
  }
}
