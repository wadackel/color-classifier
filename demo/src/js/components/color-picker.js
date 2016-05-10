import React, { Component } from "react"
import { CustomPicker } from "react-color"
import { Saturation, Hue } from "react-color/lib/components/common"

class Pointer extends Component {
  render() {
    const style = {
      width: "12px",
      height: "12px",
      borderRadius: "6px",
      backgroundColor: "rgb(248, 248, 248)",
      boxShadow: "0 1px 4px 0 rgba(0, 0, 0, .37",
      transform: "translate(-6px, -1px)"
    };

    return (
      <div style={style}></div>
    );
  }

}

class ColorPicker extends Component {
  handleChange(data) {
    this.props.onChange(data);
  }

  render() {
    const pickerStyle = {
      boxSizing: "initial",
      width: "100%",
      height: "100%",
      background: "#fff",
      borderRadius: "2px",
      boxShadow: "0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)",
      fontFamily: "Menlo"
    };

    const saturationStyle = {
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: "2px 2px 0 0"
    };

    const hueWrapperStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      height: "10px"
    };

    const hueStyle = {
      radius: "2px"
    };

    return (
      <div style={pickerStyle}>
        <div style={saturationStyle}>
          <Saturation {...this.props} pointer={Pointer} onChange={::this.handleChange}/>
          <div style={hueWrapperStyle}>
            <Hue style={hueStyle} {...this.props} pointer={Pointer} onChange={::this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default CustomPicker(ColorPicker)
