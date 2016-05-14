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

  static hexToRgb(hex) {
    const normalizedHex = this.normalizeHex(hex);

    if (normalizedHex == null) {
      return null;
    }

    const m = normalizedHex.match(HEX);
    const i = parseInt(m[1], 16);
    const r = (i >> 16) & 0xFF;
    const g = (i >> 8) & 0xFF;
    const b = i & 0xFF;

    return {r, g, b};
  }

  static rgbToHsv(rgb) {
    const { r, g, b } = rgb;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    const hsv = {};

    if (max === 0) {
      hsv.s = 0;
    } else {
      hsv.s = Math.round((delta / max * 1000) / 10);
    }

    if (max === min) {
      hsv.h = 0;
    } else if (r === max) {
      hsv.h = (g - b) / delta;
    } else if (g === max) {
      hsv.h = 2 + (b - r) / delta;
    } else {
      hsv.h = 4 + (r - g) / delta;
    }

    hsv.h = Math.round(Math.min(hsv.h * 60, 360));
    hsv.h = hsv.h < 0 ? hsv.h + 360 : hsv.h;

    hsv.v = Math.round(((max / 255) * 1000) / 10);

    return hsv;
  }

  static rgbToLab(rgb) {
    //TODO
  }

  constructor(hex) {
    this.original = hex;
    this.hex = Color.normalizeHex(hex);
    this.rgb = Color.hexToRgb(this.hex);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
