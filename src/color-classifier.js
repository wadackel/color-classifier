import Color from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  constructor(baseColors = base16Colors) {
    this.baseColors = baseColors.map(baseColor => {
      const color = new Color(baseColor);
      return {
        baseColor,
        color
      };
    });
  }

  getAppoximateColor(color) {
    // const array = [];
    //
    // forEach(this.baseColors, (baseColor) => {
    //   array.push({
    //     distance: this.getColorDistance(baseColor.hsv, color),
    //     color: baseColor.original
    //   });
    // });
    //
    // return minBy(array, "distance").color;
  }

  classify(color) {
    // const results = {};
    //
    // forEach(this.baseColors, baseColor => results[baseColor.original] = []);
    //
    // forEach(colors, (color) => {
    //   const hsv = Color(color).toHSV();
    //   const baseColor = this.getAppoximateColor(hsv);
    //
    //   results[baseColor].push(color);
    // });
    //
    // return results;
  }
}


ColorClassifier.base16Colors = base16Colors;

export default ColorClassifier;
