import React, { Component } from "react"
import ColorPicker from "./color-picker"
import { getTextColor } from "../utils/color"

export default class Color extends Component {
  state = {
    displayColorPicker: false
  };

  handleClick(e) {
    this.setState({displayColorPicker: true});
  }

  handleClose() {
    this.setState({displayColorPicker: false});
  }

  handleChangeComplete(color) {
    this.props.onChange(color.hex);
  }

  handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete();
  }

  render() {
    const { color, active } = this.props;
    const { displayColorPicker } = this.state;

    return (
      <div
        className={active ? "color--active" : "color"}
        style={{
          color: getTextColor(color)
        }}>
        <ColorPicker
          color={color}
          display={displayColorPicker}
          onChangeComplete={::this.handleChangeComplete}
          onRequestClose={::this.handleClose} />

        <div className="color__inner" onClick={::this.handleClick}>
          <span className="color__label">{color}</span>
          <button className="color__delete" onClick={::this.handleDeleteClick}>&times;</button>
        </div>
        <div className="color__bg" style={{backgroundColor: color}} />
      </div>
    );
  }
}
