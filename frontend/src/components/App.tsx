import * as React from "react";
import { hot } from "react-hot-loader";

function Tree(props: any) {
  return <pre>{JSON.stringify(props)}</pre>;
}

class App extends React.Component {
  state = { secret: 0 };

  componentDidMount() {
    this.setState({ secret: global.window["secret"] });
  }

  render() {
    return <Tree secret={this.state.secret}></Tree>;
  }
}

export default App;
