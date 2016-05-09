import React, { Component } from "react"
import Color from "./color"

export default class ColorList extends Component {
  handleChange(index, color) {
    this.props.onChangeColor(index, color);
  }

  handleDelete(index) {
    this.props.onDeleteColor(index);
  }

  render() {
    const { colors } = this.props;
    const colorItems = colors.map((color, index) => (
      <div className="color-list__item" key={color}>
        <Color
          color={color}
          onChange={(color) => this.handleChange(index, color)}
          onDelete={() => this.handleDelete(index)}
        />
      </div>
    ));

    return (
      <div className="color-list">
        {colorItems}
      </div>
    );
  }
}
