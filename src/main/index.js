import { Component } from "react";
import Menu from "../components/menu/index.js";
import Read from "../components/read/index.js";
import Write from "../components/write/index.js";
import { message } from "antd";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portIndex: undefined,
      ports: [],
      isOpen: false,
      writeType: 1,
      readType: 1,
      isScroll: true,
      readValue: [],
    };
    this.handlePortOpen = this.handlePortOpen.bind(this);
    this.getPorts = this.getPorts.bind(this);
    this.handleRequestPort = this.handleRequestPort.bind(this);
    this.handleChildrenChange = this.handleChildrenChange.bind(this);
    this.readText = this.readText.bind(this);
    this.writeText = this.writeText.bind(this);
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
  handlePortOpen({ portIndex, isOpen }) {
    // 处理打开串口
    this.setState({
      portIndex,
      isOpen,
    });
  }
  handleChildrenChange(type, value) {
    this.setState({
      [type]: value,
    });
  }
  readText(value) {
    let newValue = this.state.readValue.concat({
      value,
      type: 1,
    });
    this.setState({
      readValue: newValue,
    });
  }
  writeText(value) {
    let newValue = this.state.readValue.concat({
      value: value,
      type: 2,
    });
    this.setState({
      readValue: newValue,
    });
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
            isOpen={this.state.isOpen}
            writeType={this.state.writeType}
            readType={this.state.readType}
            isScroll={this.state.isScroll}
            handlePortOpen={this.handlePortOpen}
            handleRequestPort={this.handleRequestPort}
            readText={this.readText}
            handleChildrenChange={this.handleChildrenChange}
          />
        </div>
        <div className="w-3/4 h-screen">
          <div className="w-auto h-4/5 border-b-2 border-black border-opacity-20 p-3 overflow-x-hidden overflow-y-auto">
            <Read
              value={this.state.readValue}
              readType={this.state.readType}
              isScroll={this.state.isScroll}
            />
          </div>
          <div className="w-auto h-1/5 p-3">
            <Write
              writeText={this.writeText}
              writeType={this.state.writeType}
            />
          </div>
        </div>
      </div>
    );
  }
}
