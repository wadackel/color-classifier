import assign from "object-assign"
import React, { Component } from "react"
import { CustomPicker } from "react-color"
import { Saturation, Hue } from "react-color/lib/components/common"

class Pointer extends Component {
  static defaultProps = {
    style: {}
  };

  render() {
    const style = assign({
      width: "12px",
      height: "12px",
      borderRadius: "6px",
      backgroundColor: "rgb(248, 248, 248)",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, .37",
      transform: "translate(-6px, -1px)"
    }, this.props.style);

    return (
      <div style={style}></div>
    );
  }

}

class ColorPicker extends Component {
  static defaultProps = {
    display: false,
    popoverStyle: {},
    coverStyle: {},
    pickerStyle: {},
    saturationStyle: {},
    hueWrapperStyle: {},
    hueStyle: {},
    onRequestClose: function() {}
  };

  handleChange(data) {
    this.props.onChange(data);
  }

  handleCoverClick() {
    this.props.onRequestClose();
  }

  render() {
    if (this.props.display === false) {
      return null;
    }

    const popoverStyle = assign({
      position: "absolute",
      zIndex: 9999,
      width: "100%",
      height: "100%"
    }, this.props.popoverStyle);

    const coverStyle = assign({
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }, this.props.coverStyle);

    const pickerStyle = assign({
      position: "relative",
      zIndex: 10,
      boxSizing: "border-box",
      width: "100%",
      height: "100%"
    }, this.props.pickerStyle);

    const saturationStyle = assign({
      position: "relative",
      width: "100%",
      height: "100%"
    }, this.props.saturationStyle);

    const hueWrapperStyle = assign({
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      height: "10px"
    }, this.props.hueWrapperStyle);

    const hueStyle = assign({
      radius: "2px"
    }, this.props.hueStyle);

    return (
      <div style={popoverStyle}>
        <div style={coverStyle} onClick={::this.handleCoverClick} />
        <div style={pickerStyle}>
          <div style={saturationStyle}>
            <Saturation {...this.props} pointer={Pointer} onChange={::this.handleChange}/>
            <div style={hueWrapperStyle}>
              <Hue style={hueStyle} {...this.props} pointer={Pointer} onChange={::this.handleChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPicker)
