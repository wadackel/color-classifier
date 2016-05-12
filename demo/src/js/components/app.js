import React, { Component } from "react"
import ColorClassifier, { Palette } from "../../../../"
import ColorList from "./color-list"
import ColorPicker from "./color-picker"
import { getTextColor, getRandomColor } from "../utils/color"


export default class App extends Component {
  state = {
    color: getRandomColor(),
    colors: [...Palette.PCCS],
    displayColorPicker: false
  };

  constructor(props) {
    super(props);
    this.colorClassifier = new ColorClassifier(this.state.colors);
  }

  handleMainChangeColor(color) {
    this.setState({
      color: color.hex,
      displayColorPicker: false
    });
  }

  handleMainClick() {
    this.setState({displayColorPicker: true});
  }

  handleMainClose() {
    this.setState({displayColorPicker: false});
  }

  handleChangeColor(index, color) {
    const colors = [...this.state.colors];
    colors[index] = color;
    this.setState({colors});
  }

  handleDeleteColor(index) {
    const colors = [...this.state.colors];
    colors.splice(index, 1);
    this.setState({colors});
  }

  handleRequestAddColor() {
    const colors = [...this.state.colors];
    const color = getRandomColor();
    colors.push(color);
    this.setState({colors});
  }

  render() {
    const { colorClassifier } = this;
    const { color, colors, displayColorPicker } = this.state;

    colorClassifier.setPalette(colors);
    const activeColor = colorClassifier.classify(color);

    return (
      <div className="full-size">
        <h1 className="logo">color-classifier.js</h1>
        <div className="row">
          <div className="col">
            <ColorPicker
              color={color}
              display={displayColorPicker}
              hueWrapperStyle={{
                top: "auto",
                bottom: 0
              }}
              onChangeComplete={::this.handleMainChangeColor}
              onRequestClose={::this.handleMainClose} />
            <div
              className="main-color"
              style={{backgroundColor: color}}
              onClick={::this.handleMainClick}>
              <span
                className="main-color__label"
                style={{
                  color: getTextColor(color)
                }}
                onClick={e => e.stopPropagation()}>
                {color}
              </span>
            </div>
          </div>
          <div className="col">
            <ColorList
              colors={this.state.colors}
              activeColor={activeColor}
              onChangeColor={::this.handleChangeColor}
              onDeleteColor={::this.handleDeleteColor}
              onRequestAddColor={::this.handleRequestAddColor} />
          </div>
        </div>
      </div>
    );
  }
}
