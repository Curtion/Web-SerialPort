import { Component } from "react";
import { Card, Radio, Button } from "antd";
export default class Write extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.props.handleReadType(e.target.value);
  }
  render() {
    return (
      <Card
        title="接收区设置"
        style={{ width: "100%" }}
        size="small"
        className="mt-2"
      >
        <Radio.Group onChange={this.onChange} value={this.props.readType}>
          <Radio value={1}>ASCII</Radio>
          <Radio value={2}>HEX</Radio>
        </Radio.Group>
        <Button
          type="dashed"
          className="mt-2"
          onClick={this.props.handleScroll}
          danger={!Boolean(this.props.isScroll)}
          block
        >
          {this.props.isScroll ? "暂停滚动" : "继续滚动"}
        </Button>
        <Button
          type="dashed"
          className="mt-2"
          onClick={this.props.handleClear}
          block
        >
          清空窗口
        </Button>
      </Card>
    );
  }
}
