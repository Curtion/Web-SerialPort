import { Component } from "react";
import { Select, Button, AutoComplete } from "antd";
import USBDevice from "../../assets/usb.json";
import { message } from "antd";
const { Option } = Select;
const baudRate = [
  { value: "110" },
  { value: "300" },
  { value: "600" },
  { value: "1200" },
  { value: "2400" },
  { value: "4800" },
  { value: "7200" },
  { value: "9600" },
  { value: "14400" },
  { value: "19200" },
  { value: "28800" },
  { value: "38400" },
  { value: "56000" },
  { value: "57600" },
  { value: "76800" },
  { value: "115200" },
  { value: "230400" },
  { value: "460800" },
];
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portIndex: undefined,
      baudRate: "115200",
      dataBits: "8",
      stopBits: "1",
      parity: "none",
      flowControl: "none",
      isOpen: false,
    };
    this.option = this.option.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setSerial = this.setSerial.bind(this);
  }
  option() {
    // 串口列表
    return this.props.ports.map((port, index) => {
      const { usbProductId, usbVendorId } = port.getInfo();
      if (usbProductId === undefined || usbVendorId === undefined) {
        return (
          <Option value={index} key={index}>
            未知设备({index}))
          </Option>
        );
      }
      const usbVendor = USBDevice.filter(
        (item) => parseInt(item.vendor, 16) === usbVendorId
      );
      let usbProduct = [];
      if (usbVendor.length === 1) {
        usbProduct = usbVendor[0].devices.filter(
          (item) => parseInt(item.devid, 16) === usbProductId
        );
      }
      return (
        <Option value={index} key={index}>
          {usbProduct[0].devname}
        </Option>
      );
    });
  }
  handleChange(type, val) {
    this.setState({ [type]: val });
  }
  setSerial() {
    // 设置串口
    if (this.state.portIndex === undefined) {
      message.error("请选择串口");
      return;
    }
    if (!this.state.isOpen) {
      this.props.handlePortOpen({
        portIndex: this.state.portIndex,
        isOpen: !this.state.isOpen,
      });
    }
    this.setState((state) => {
      return {
        isOpen: !state.isOpen,
      };
    });
  }
  render() {
    return (
      <>
        <div className="flex">
          <div className="flex justify-center items-center">串口：</div>
          <Select
            onChange={this.handleChange.bind(this, "portIndex")}
            className="flex-1 h-8 cursor-pointer"
            placeholder="请选择串口"
            allowClear
            disabled={this.state.isOpen}
          >
            {this.option()}
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">波特率：</div>
          <AutoComplete
            onChange={this.handleChange.bind(this, "baudRate")}
            className="flex-1 h-8"
            options={baudRate}
            placeholder="请输入波特率"
            defaultValue="115200"
            allowClear
            disabled={this.state.isOpen}
          />
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">数据位：</div>
          <Select
            className="flex-1 h-8"
            defaultValue="8"
            disabled={this.state.isOpen}
            onChange={this.handleChange.bind(this, "dataBits")}
          >
            <Option value="7">7</Option>
            <Option value="8">8</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">停止位：</div>
          <Select
            className="flex-1 h-8"
            defaultValue="1"
            disabled={this.state.isOpen}
            onChange={this.handleChange.bind(this, "stopBits")}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">校验位：</div>
          <Select
            className="flex-1 h-8"
            defaultValue="None"
            disabled={this.state.isOpen}
            onChange={this.handleChange.bind(this, "parity")}
          >
            <Option value="none">None</Option>
            <Option value="even">Even</Option>
            <Option value="odd">Odd</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">流控制：</div>
          <Select
            className="flex-1 h-8"
            defaultValue="None"
            disabled={this.state.isOpen}
            onChange={this.handleChange.bind(this, "flowControl")}
          >
            <Option value="none">None</Option>
            <Option value="hardware">HardWare</Option>
          </Select>
        </div>
        <div className="flex mt-2 justify-between">
          <Button
            type="primary"
            className="flex-grow mr-3"
            onClick={this.setSerial}
            danger={this.state.isOpen}
          >
            {this.state.isOpen ? "关闭串口" : "打开串口"}
          </Button>
          <Button type="dashed" onClick={this.props.handleRequestPort}>
            新增授权
          </Button>
        </div>
      </>
    );
  }
}
