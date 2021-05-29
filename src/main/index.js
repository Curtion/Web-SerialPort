import { Component } from "react";
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
    return <button onClick={this.handleGetPort}>ceshi</button>;
  }
}
