import React, { Component } from "react"
import ColorClassifier, { base16Colors } from "../../../../"
import ColorList from "./color-list"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [...base16Colors]
    };
  }

  handleChangeColor(index, color) {
    const { colors } = this.state;
    const newColors = [...colors];
    newColors[index] = color;
    this.setState({colors: newColors});
  }

  handleDeleteColor(index) {
    const { colors } = this.state;
    const newColors = [...colors];
    newColors.splice(index, 1);
    this.setState({colors: newColors});
  }

  handleRequestAddColor() {
    const { colors } = this.state;
    const newColors = [...colors];
    const color = `#${Math.random().toString(16).slice(-6)}`;
    newColors.push(color);
    this.setState({colors: newColors});
  }

  render() {
    return (
      <div className="full-size">
        <h1 className="logo">color-classifier.js</h1>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <ColorList
              colors={this.state.colors}
              onChangeColor={::this.handleChangeColor}
              onDeleteColor={::this.handleDeleteColor}
              onRequestAddColor={::this.handleRequestAddColor}
            />
          </div>
        </div>
      </div>
    );
  }
}
