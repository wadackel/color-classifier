import Color from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  constructor(baseColors = base16Colors) {
    console.log( new Color("#008080") );
    console.log( new Color("#00F") );
    console.log( new Color("#C0C0C0") );
    console.log( new Color("#fff") );

    // this.baseColors = baseColors.map(color => {
    //   return {
    //     hsv: Color(color).toHSV(),
    //     original: color
    //   };
    // });
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

  exec(colors) {
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
