import { Component } from "react";
import Init from "./init";
import Main from "./main";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
    this.handleState = this.handleState.bind(this);
  }
  handleState(status) {
    this.setState({
      status,
    });
  }
  render() {
    if (this.state.status) {
      return <Main />;
    } else {
      return <Init handleState={this.handleState} />;
    }
  }
}
