import minBy from "./utils/min-by"
import Color from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  constructor(baseColors = base16Colors) {
    this.baseColors = baseColors.map(baseColor => new Color(baseColor));
  }

  classify(hex) {
    if (Array.isArray(hex)) {
      // TODO
      return null;
    }

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
}


ColorClassifier.base16Colors = base16Colors;

export default ColorClassifier;
