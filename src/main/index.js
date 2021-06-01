import { Component } from "react";
import Menu from "../components/menu/index.js";
import { message } from "antd";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portIndex: undefined,
      ports: [],
    };
    this.openPort = this.openPort.bind(this);
    this.handlePortOpen = this.handlePortOpen.bind(this);
    this.getPorts = this.getPorts.bind(this);
    this.handleRequestPort = this.handleRequestPort.bind(this);
  }
  async getPorts() {
    // 获取已授权的全部串口
    let ports = await navigator.serial.getPorts();
    this.setState({
      ports,
    });
  }
  async handleRequestPort() {
    // 请求授权
    try {
      await navigator.serial.requestPort();
      this.getPorts();
    } catch (e) {
      message.error(e.toString());
    }
  }
  async openPort({ portIndex: index, isOpen }) {
    // 打开串口
    let port = this.state.ports[index];
    if (!isOpen) {
      // 关闭串口
      const encoder = new TextEncoder();
      const writer = port.writable.getWriter();
      writer.write(encoder.encode("A long message that will take..."));
      await writer.close();
      await port.close();
    } else {
      await port.open({ baudRate: 115200 });
      while (port.readable) {
        const reader = port.readable.getReader();
        try {
          while (true) {
            const { value, done } = await reader.read();
            console.log(value);
            if (done) {
              break;
            }
          }
        } catch (error) {
          message.error(error.toString());
        } finally {
          reader.releaseLock();
        }
      }
    }
  }
  handlePortOpen(val) {
    // 处理打开串口
    this.setState({
      portIndex: val,
    });
    this.openPort(val);
  }
  componentDidMount() {
    this.getPorts();
  }
  render() {
    return (
      <div className="w-9/12 h-screen bg-gray-100 flex mx-auto shadow-2xl">
        <div className="w-1/4 h-screen border-r-2 border-black border-opacity-20 p-3">
          <Menu
            ports={this.state.ports}
            handlePortOpen={this.handlePortOpen}
            handleRequestPort={this.handleRequestPort}
          />
        </div>
        <div className="w-3/4 h-screen">
          <div className="w-auto h-4/5 border-b-2 border-black border-opacity-20 p-3"></div>
          <div className="w-auto h-1/5 p-3"></div>
        </div>
      </div>
    );
  }
}
