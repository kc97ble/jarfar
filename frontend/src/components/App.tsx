import * as React from "react";
import TreeDrawer from "./TreeDrawer";

class App extends React.Component {
  state = {
    people: [],
    tree: null,
    ready: false,
  };

  componentDidMount() {
    const dataPeopleNode = document.getElementById("data-people") as HTMLInputElement;
    const dataTreeNode = document.getElementById("data-tree") as HTMLInputElement;
    console.log(dataPeopleNode);
    console.log(dataTreeNode);
    this.setState({
      people: JSON.parse(dataPeopleNode.value),
      tree: JSON.parse(dataTreeNode.value),
      ready: true,
    });
  }

  render() {
    return this.state.ready ? (
      <TreeDrawer
        people={this.state.people as any}
        root={this.state.tree as any}
      ></TreeDrawer>
    ) : (
      "Loading"
    );
  }
}

export default App;
