import forEach from "lodash.foreach"
import minBy from "lodash.minby"
import Color from "color-js"
import base16Colors from "./base16-colors"

class ColorClassify {
  constructor(baseColors = base16Colors) {
    this.baseColors = baseColors.map(color => {
      return {
        hsv: Color(color).toHSV(),
        original: color
      };
    });
  }

  getColorDistance(a, b) {
    let hueDiff = 0;

    if (a.hue > b.hue) {
      hueDiff = Math.min(a.hue - b.hue, b.hue - a.hue + 360);
    } else {
      hueDiff = Math.min(b.hue - a.hue, a.hue - b.hue + 360);
    }

    return Math.sqrt(
      Math.pow(hueDiff, 2)
      + Math.pow(a.saturation - b.saturation, 2)
      + Math.pow(a.value - b.value, 2)
    );
  }

  getAppoximateColor(color) {
    const array = [];

    forEach(this.baseColors, (baseColor) => {
      array.push({
        distance: this.getColorDistance(baseColor.hsv, color),
        color: baseColor.original
      });
    });

    return minBy(array, "distance").color;
  }

  exec(colors) {
    const results = {};

    forEach(this.baseColors, baseColor => results[baseColor.original] = []);

    forEach(colors, (color) => {
      const hsv = Color(color).toHSV();
      const baseColor = this.getAppoximateColor(hsv);

      results[baseColor].push(color);
    });

    return results;
  }
}


ColorClassify.base16Colors = base16Colors;

export default ColorClassify;
