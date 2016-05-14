import convert from "color-convert"

const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;


export default class Color {
  static normalizeHex(hex) {
    if (HEX.test(hex)) {
      return hex;

    } else if (HEX_SHORT.test(hex)) {
      const r = hex.slice(1, 2);
      const g = hex.slice(2, 3);
      const b = hex.slice(3, 4);
      return `#${r + r}${g + g}${b + b}`;
    }

    return null;
  }

  static parseHex(hex) {
    let normalizedHex = this.normalizeHex(hex);

    if (normalizedHex === null) {
      return null;
    }

    const [r, g, b] = convert.hex.rgb(normalizedHex);
    return {r, g, b};
  }

  static rgbToHsv(rgb) {
    const [h, s, v] = convert.rgb.hsv([rgb.r, rgb.g, rgb.b]);
    return {h, s, v};
  }

  constructor(hex) {
    this.original = hex;
    this.hex = Color.normalizeHex(hex);
    this.rgb = Color.parseHex(this.hex);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
