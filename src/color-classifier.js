import minBy from "./utils/min-by"
import Color from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  constructor(baseColors = base16Colors) {
    this.baseColors = baseColors.map(baseColor => new Color(baseColor));
  }

  classify(hex) {
    const { baseColors } = this;
    const hsv = new Color(hex).hsv;
    const array = [];

    baseColors.forEach(baseColor => {
      array.push({
        distance: Color.hsvDistance(baseColor.hsv, hsv),
        color: baseColor.original
      });
    });

    return minBy(array, "distance").color;
  }

  classifyFromArray(hexArray) {
    const results = {};

    hexArray.forEach(hex => {
      const baseColor = this.classify(hex);

      if (!results.hasOwnProperty(baseColor)) {
        results[baseColor] = [];
      }

      results[baseColor].push(hex);
    });

    return results;
  }
}


ColorClassifier.base16Colors = base16Colors;

export default ColorClassifier;
