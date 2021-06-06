import { Component } from "react";
import { hex2a } from "./ullti.js";
import "./index.css";
export default class Read extends Component {
  renderLi() {
    const readType = this.props.readType;
    return this.props.value.map((items, index) => {
      const item = items.value;
      const type = items.type; // 1接收，2发送
      let body = [];
      if (item !== undefined) {
        let strArr = [];
        for (let hex of Array.from(item)) {
          strArr.push(hex.toString(16).toLocaleUpperCase());
        }
        if (strArr.includes("D") && strArr.includes("A")) {
          if (strArr.indexOf("A") - strArr.indexOf("D") === 1) {
            strArr.splice(strArr.indexOf("D"), 1);
            strArr.splice(strArr.indexOf("A"), 1, <br key={0} />);
          }
        }
        strArr = strArr.map((item) => {
          if (typeof item === "string") {
            if (readType === 1) {
              return hex2a(parseInt(item, 16));
            } else if (readType === 2) {
              return item + " ";
            }
          }
          return item;
        });
        if (typeof strArr[strArr.length - 1] === "string") {
          strArr.push(<br key={1} />);
        }
        body.push(strArr);
      }
      return (
        <span className={this.textColor(type)} key={index}>
          {body}
        </span>
      );
    });
  }
  textColor(type) {
    let className = "py-3 ";
    if (type === 1) {
      className += "text-green-700";
    } else if (type === 2) {
      className += "text-blue-700";
    }
    return className;
  }
  scrollToBottom = () => {
    this.bodyEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidUpdate() {
    if (this.props.isScroll) {
      this.scrollToBottom();
    }
  }
  render() {
    return (
      <>
        <div className="break-all text-xl">{this.renderLi()}</div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.bodyEnd = el;
          }}
        ></div>
      </>
    );
  }
}
