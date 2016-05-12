import minBy from "./utils/min-by"
import Color, { AlgorithmTypes } from "./utils/color"
import base16Colors from "./base16-colors"


class ColorClassifier {
  static AlgorithmTypes = AlgorithmTypes;
  static base16Colors = base16Colors;

  static throwError(msg) {
    throw new Error(`[ColorClassifier] ${msg}`);
  }


  constructor(baseColors = base16Colors, algorithmType = AlgorithmTypes.CIEDE2000) {
    this.setBaseColors(baseColors);
    this.setAlgorithmType(algorithmType);
  }

  setBaseColors(baseColors) {
    if (!Array.isArray(baseColors)) {
      ColorClassifier.throwError(`baseColors is should be a Array.`)
    }
    this.baseColors = baseColors.map(baseColor => new Color(baseColor));
  }

  getBaseColors() {
    return this.baseColors;
  }

  setAlgorithmType(algorithmType) {
    if (!AlgorithmTypes.hasOwnProperty(algorithmType)) {
      ColorClassifier.throwError(`${algorithmType} is an undefined algorithm type.`)
    }
    this.algorithmType = algorithmType;
  }

  getAlgorithmType() {
    return this.algorithmType;
  }

  classify(hex) {
    const { baseColors, algorithmType } = this;
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


export default ColorClassifier;
