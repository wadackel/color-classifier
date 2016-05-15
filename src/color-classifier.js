import minBy from "./utils/min-by"
import Color from "./utils/color"
import ColorDiff, { AlgorithmTypes } from "./utils/color-diff"
import * as Palette from "./palette/"


function equal(a, b) {
  if (a === b) return true;

  let ka;
  let kb;
  try {
    ka = Object.keys(a);
    kb = Object.keys(b);
  } catch (e) {
    return false;
  }

  if (ka.length !== kb.length) return false;

  for (let i = 0; ka.length - 1; i++) {
    const key = ka[i];
    if (a[key] !== b[key]) return false;
  }

  return typeof a === typeof b;
}


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
      ColorClassifier.throwError("palette is should be a Array.")
    }
    this.palette = palette.map(c => new Color(c));
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

  classify(value, format = "rgb") {
    const { palette, algorithmType } = this;
    const color = new Color(value);
    const array = [];

    palette.forEach(paletteColor => {
      array.push({
        distance: ColorDiff.diff(algorithmType, paletteColor, color),
        color: format === "raw" ? paletteColor : paletteColor[format]
      });
    });

    return minBy(array, "distance").color;
  }

  classifyFromArray(colors, format = "rgb") {
    const results = [];
    const array = [];

    colors.forEach(value => {
      const color = new Color(value);
      const palette = this.classify(color.rgb, "raw");
      array.push({ palette, color });
    });

    array.forEach(obj => {
      const { palette, color } = obj;
      const [ paletteColor ] = results.filter(o => equal(o.palette, palette[format]));

      if (!paletteColor) {
        results.push({
          palette: palette[format],
          colors: [color[format]]
        });

      } else {
        paletteColor.colors.push(color[format]);
      }
    });

    return results;
  }
}


ColorClassifier.Palette = Palette;
ColorClassifier.AlgorithmTypes = AlgorithmTypes;
export default ColorClassifier;
