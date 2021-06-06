import { Component } from "react";
import { Input, Button, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { a2hex } from "./ullti.js";
const { TextArea } = Input;
export default class Write extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({ value: e.target.value });
  }
  onClick() {
    const writeType = this.props.writeType;
    let value = this.state.value;
    let arr = [];
    if (value === null) {
      return;
    }
    if (writeType === 1) {
      // ASCII
      for (let i = 0; i < value.length; i++) {
        arr.push(a2hex(value[i]));
      }
    } else if (writeType === 2) {
      // HEX
      console.log(/^[0-9A-Fa-f]+$/.test(value));
      if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
        for (let i = 0; i < value.length; i = i + 2) {
          arr.push(parseInt(value.substring(i, i + 2), 16));
        }
      } else {
        message.error("格式错误");
        return;
      }
    }
    this.props.writeText(arr);
  }
  render() {
    return (
      <div className="h-full relative">
        <TextArea onChange={this.onChange} className="h-full resize-none" />
        <Button
          className="absolute right-2 bottom-2"
          onClick={this.onClick}
          type="primary"
        >
          <span className="flex justify-centeru items-center">
            <SendOutlined />
            发送
          </span>
        </Button>
      </div>
    );
  }
}
