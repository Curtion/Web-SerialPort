import { Component } from "react";
import "./init.css";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleGetPort = this.handleGetPort.bind(this);
  }
  async handleGetPort() {
    try {
      let port = await navigator.serial.requestPort();
      this.props.handleState(true, port);
    } catch (e) {
      this.props.handleState(false);
    }
  }
  render() {
    return (
      <div class="box">
        <button class="button" onClick={this.handleGetPort}>
          点击获取串口设备
        </button>
      </div>
    );
  }
}
