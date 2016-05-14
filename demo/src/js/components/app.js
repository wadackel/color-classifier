import React, { Component } from "react"
import Select from "react-select"
import ColorClassifier, { Palette, AlgorithmTypes } from "../../../../"
import ColorList from "./color-list"
import ColorPicker from "./color-picker"
import { getTextColor, getRandomColor } from "../utils/color"


export default class App extends Component {
  state = {
    color: getRandomColor(),
    colors: [...Palette.PCCS],
    displayColorPicker: false,
    algorithmType: AlgorithmTypes.CIEDE2000
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

  handleRandomColorClick() {
    this.setState({color: getRandomColor()});
  }

  handleAlgorithmTypeChange(obj) {
    this.setState({algorithmType: obj.value});
  }

  render() {
    const { colorClassifier } = this;
    const { color, colors, displayColorPicker, algorithmType } = this.state;

    colorClassifier.setPalette(colors);
    colorClassifier.setAlgorithmType(algorithmType);
    const activeColor = colorClassifier.classify(color, "hex");

    return (
      <div className="full-size">
        <div className="header">
          <h1 className="logo">color-classifier.js</h1>
          <ul className="gnav">
            <li className="gnav__item"><button onClick={::this.handleRandomColorClick}><i className="fa fa-random" /></button></li>
            <li className="gnav__item">
              <Select
                options={[
                  {value: AlgorithmTypes.RGB, label: "RGB"},
                  {value: AlgorithmTypes.HSV, label: "HSV"},
                  {value: AlgorithmTypes.CIEDE2000, label: "CIEDE2000"}
                ]}
                value={algorithmType}
                placeholder="AlgorithmTypes"
                clearable={false}
                searchable={false}
                onChange={::this.handleAlgorithmTypeChange}/>
            </li>
            <li className="gnav__item"><a href="https://github.com/tsuyoshiwada/color-classifier" target="_blank"><i className="fa fa-github" /> Source on GitHub</a></li>
          </ul>
        </div>
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
