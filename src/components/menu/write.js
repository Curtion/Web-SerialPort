import { Component } from "react";
import { Card, Radio } from "antd";
export default class Write extends Component {
  onChange(e) {
    console.log(e.target.value);
  }
  render() {
    return (
      <Card
        title="发送区设置"
        style={{ width: "100%" }}
        size="small"
        className="mt-2"
      >
        <Radio.Group onChange={this.onChange} value={1}>
          <Radio value={1}>HEX</Radio>
          <Radio value={2}>ASCII</Radio>
        </Radio.Group>
      </Card>
    );
  }
}
