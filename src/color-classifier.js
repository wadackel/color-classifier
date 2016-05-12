import minBy from "./utils/min-by"
import Color, { AlgorithmTypes } from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  static AlgorithmTypes = AlgorithmTypes;
  static base16Colors = base16Colors;


  constructor(baseColors = base16Colors) {
    this.setBaseColors(baseColors);
  }

  setBaseColors(baseColors) {
    this.baseColors = baseColors.map(baseColor => new Color(baseColor));
  }

  getBaseColors() {
    return this.baseColors;
  }

  classify(hex, algorithmType = AlgorithmTypes.CIEDE2000) {
    const { baseColors } = this;
    const color = new Color(hex);
    const array = [];

    baseColors.forEach(baseColor => {
      array.push({
        distance: Color.distance(baseColor, color, algorithmType),
        color: baseColor.original
      });
    });

    return minBy(array, "distance").color;
  }

  classifyFromArray(hexArray, algorithmType = AlgorithmTypes.CIEDE2000) {
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


export default ColorClassifier;
