import { Component } from "react";
import { Select, Button, AutoComplete } from "antd";
import USBDevice from "../../assets/usb.json";
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
    };
    this.option = this.option.bind(this);
    this.handleBaudRateChange = this.handleBaudRateChange.bind(this);
  }
  option() {
    return this.props.ports.map((port, index) => {
      const { usbProductId, usbVendorId } = port.getInfo();
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
        <Option value={index} key={usbProductId}>
          {usbProduct[0].devname}
        </Option>
      );
    });
  }
  handleBaudRateChange(val) {
    this.setState({ portIndex: val });
  }
  render() {
    return (
      <>
        <div className="flex">
          <div className="flex justify-center items-center">串口：</div>
          <Select
            defaultValue={this.props.value}
            onChange={this.handleBaudRateChange}
            className="flex-1 h-8 cursor-pointer"
            placeholder="请选择串口"
            allowClear
          >
            {this.option()}
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">波特率：</div>
          <AutoComplete
            className="flex-1 h-8"
            options={baudRate}
            placeholder="请输入波特率"
            defaultValue="115200"
            allowClear
          />
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">数据位：</div>
          <Select className="flex-1 h-8" defaultValue="8">
            <Option value="7">7</Option>
            <Option value="8">8</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">停止位：</div>
          <Select className="flex-1 h-8" defaultValue="1">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">校验位：</div>
          <Select className="flex-1 h-8" defaultValue="None">
            <Option value="none">None</Option>
            <Option value="even">Even</Option>
            <Option value="odd">Odd</Option>
          </Select>
        </div>
        <div className="flex mt-2">
          <div className="flex justify-center items-center">流控制：</div>
          <Select className="flex-1 h-8" defaultValue="None">
            <Option value="none">None</Option>
            <Option value="hardware">HardWare</Option>
          </Select>
        </div>
        <div className="flex mt-2 justify-between">
          <Button
            type="primary"
            className="flex-grow mr-3"
            onClick={this.props.handlePortOpen.bind(this, this.state.portIndex)}
          >
            打开串口
          </Button>
          <Button type="dashed" onClick={this.props.handleRequestPort}>
            新增授权
          </Button>
        </div>
      </>
    );
  }
}
