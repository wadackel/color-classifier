const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

export default class Color {
  static parseHex(hex) {
    const rgb = {};

    if (HEX_SHORT.test(hex)) {
      const r = hex.slice(1, 2);
      const g = hex.slice(2, 3);
      const b = hex.slice(3, 4);
      rgb.r = parseInt(r + r, 16);
      rgb.g = parseInt(g + g, 16);
      rgb.b = parseInt(b + b, 16);

    } else if (HEX.test(hex)) {
      rgb.r = parseInt(hex.slice(1, 3), 16);
      rgb.g = parseInt(hex.slice(3, 5), 16);
      rgb.b = parseInt(hex.slice(5, 7), 16);

    } else {
      return null;
    }

    return rgb;
  }

  static rgbToHsv(rgb) {
    const { r, g, b } = rgb;
    const hsv = {};
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;

    if (max === 0) {
      hsv.s = 0;
    } else {
      hsv.s = Math.round(delta / max * 100);
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

    hsv.h = Math.min(Math.round(hsv.h * 60), 360);

    if (hsv.h < 0) {
      hsv.h += 360;
    }

    hsv.v = Math.round((max / 255) * 100);

    return hsv;
  }

  static hsvDistance(a, b) {
    let hueDiff = 0;

    if (a.h > b.h) {
      hueDiff = Math.min(a.h - b.h, b.h - a.h + 360);
    } else {
      hueDiff = Math.min(b.h - a.h, a.h - b.h + 360);
    }

    return Math.sqrt(
      Math.pow(hueDiff, 2)
      + Math.pow(a.s - b.s, 2)
      + Math.pow(a.v - b.v, 2)
    );
  }

  static rgbDistance(a, b) {
    // TODO
  }

  constructor(hex) {
    this.original = rgb;
    this.rgb = Color.parseHex(hex);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
