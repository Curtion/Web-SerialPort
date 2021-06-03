import { Component } from "react";
import { Card, Radio } from "antd";
export default class Write extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.handleWriteType(e.target.value);
  }
  render() {
    return (
      <Card
        title="发送区设置"
        style={{ width: "100%" }}
        size="small"
        className="mt-2"
      >
        <Radio.Group onChange={this.onChange} value={this.props.writeType}>
          <Radio value={1}>ASCII</Radio>
          <Radio value={2}>HEX</Radio>
        </Radio.Group>
      </Card>
    );
  }
}
