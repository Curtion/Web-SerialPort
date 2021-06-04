import { Component } from "react";
import { message } from "antd";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleGetPort = this.handleGetPort.bind(this);
    this.getPorts = this.getPorts.bind(this);
  }
  async handleGetPort() {
    // 客户端授权
    try {
      await navigator.serial.requestPort();
      this.props.handleState(true);
    } catch (e) {
      message.error(e.toString());
    }
  }
  async getPorts() {
    navigator.serial.getPorts().then(async (ports) => {
      if (ports.length > 0) {
        this.props.handleState(true);
      }
    });
  }
  componentDidMount() {
    // 判断是否进行过授权
    navigator.serial.addEventListener("connect", (e) => {
      message.success("设备已连接");
      this.getPorts();
    });
    navigator.serial.addEventListener("disconnect", (e) => {
      message.error("设备已断开");
    });
    this.getPorts();
  }
  render() {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200">
        <span className="mb-5 text-3xl">
          仅支持Chrome 89+或者Edge 89+浏览器
        </span>
        <button
          className="w-auto h-12 px-5 rounded-2xl bg-red-400 hover:bg-red-500 text-xl text-black text-opacity-80"
          onClick={this.handleGetPort}
        >
          点击授权
        </button>
      </div>
    );
  }
}
