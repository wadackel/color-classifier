import React, { Component } from "react"
import ColorPicker from "./color-picker"
import ColorUtil from "../../../../src/utils/color"

function luminance(color) {
  const rgb = ColorUtil.parseHex(color);
  return Math.floor(
    0.298912 * rgb.r +
    0.586611 * rgb.g +
    0.114478 * rgb.b
  );
}

function getTextColor(backgroundColor) {
  return luminance(backgroundColor) < 120 ? "#fff" : "#000";
}

export default class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false
    };
  }

  handleClick(e) {
    this.setState({displayColorPicker: !this.state.displayColorPicker});
  }

  handleClose() {
    this.setState({displayColorPicker: false});
  }

  handleChange(color) {
    console.log(color);
    this.props.onChange(color);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete();
  }

  render() {
    const { color } = this.props;
    const { displayColorPicker } = this.state;
    const popover = {
      position: "absolute",
      zIndex: 9999,
      width: "100%",
      height: "100%"
    };

    const cover = {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };

    return (
      <div
        className="color"
        style={{
          color: getTextColor(color)
        }}
      >
        {displayColorPicker ? <div style={popover}>
          <div style={cover} onClick={::this.handleClose} />
          <ColorPicker color={color} onChange={::this.handleChange} />
        </div> : null}

        <div className="color__inner" onClick={::this.handleClick}>
          <span className="color__label">{color}</span>
          <button className="color__delete" onClick={::this.handleDeleteClick}>&times;</button>
        </div>
        <div className="color__bg" style={{backgroundColor: color}} />
      </div>
    );
  }
}
