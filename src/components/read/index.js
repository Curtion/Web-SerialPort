import { Component } from "react";
export default class Read extends Component {
  renderLi() {
    const type = this.props.readType;
    let text = "";
    this.props.value.forEach((item, index) => {
      if (type === 1) {
        text = item;
      } else if (type === 2) {
        if (item === 10 || item === 13) {
          text = text + "\r\n";
        } else {
          text = text + item.toString(16).toLocaleUpperCase();
        }
      }
    });
    return text;
  }
  render() {
    return (
      <div>
        <ul>{this.renderLi()}</ul>
      </div>
    );
  }
}
