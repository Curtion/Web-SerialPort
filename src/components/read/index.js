import { Component } from "react";
export default class Read extends Component {
  renderLi() {
    let li = [];
    for (let item of this.props.value) {
      li.push(<div>{new TextDecoder().decode(item)}</div>);
    }
    return li;
  }
  render() {
    return (
      <div>
        <ul>{this.renderLi()}</ul>
      </div>
    );
  }
}
