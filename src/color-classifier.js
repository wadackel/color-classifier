import minBy from "./utils/min-by"
import Color, { AlgorithmTypes } from "./utils/color"
import * as Palette from "./palette/"


class ColorClassifier {
  static throwError(msg) {
    throw new Error(`[ColorClassifier] ${msg}`);
  }

  constructor(palette = Palette.W3C, algorithmType = AlgorithmTypes.CIEDE2000) {
    this.setPalette(palette);
    this.setAlgorithmType(algorithmType);
  }

  setPalette(palette) {
    if (!Array.isArray(palette)) {
      ColorClassifier.throwError(`palette is should be a Array.`)
    }
    this.palette = palette.map(baseColor => new Color(baseColor));
  }

  getPalette() {
    return this.palette;
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
    const { palette, algorithmType } = this;
    const color = new Color(hex);
    const array = [];

    palette.forEach(paletteColor => {
      array.push({
        distance: Color.distance(paletteColor, color, algorithmType),
        color: paletteColor.original
      });
    });

    return minBy(array, "distance").color;
  }

  classifyFromArray(hexArray) {
    const results = {};

    hexArray.forEach(hex => {
      const resultColor = this.classify(hex);

      if (!results.hasOwnProperty(resultColor)) {
        results[resultColor] = [];
      }

      results[resultColor].push(hex);
    });

    return results;
  }
}


ColorClassifier.Palette = Palette;
ColorClassifier.AlgorithmTypes = AlgorithmTypes;
export default ColorClassifier;
