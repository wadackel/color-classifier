import React, { Component } from "react"
import Color from "./color"

export default class ColorList extends Component {
  handleChange(index, color) {
    this.props.onChangeColor(index, color);
  }

  handleDelete(index) {
    this.props.onDeleteColor(index);
  }

  handleAddColorClick() {
    this.props.onRequestAddColor();
  }

  render() {
    const { colors, activeColor } = this.props;
    const colorItems = colors.map((color, index) => (
      <div className="color-list__item" key={color}>
        <Color
          color={color}
          active={color === activeColor}
          onChange={(color) => this.handleChange(index, color)}
          onDelete={() => this.handleDelete(index)} />
      </div>
    ));

    colorItems.push(
      <div className="color-list__item--add" key="add-color" onClick={::this.handleAddColorClick}>Add Color</div>
    );

    return (
      <div className="color-list">
        {colorItems}
      </div>
    );
  }
}
