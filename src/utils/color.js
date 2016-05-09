const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

export default class Color {
  static parseRgb(rgb) {
    const obj = {};

    if (HEX_SHORT.test(rgb)) {
      const r = rgb.slice(1, 2);
      const g = rgb.slice(2, 3);
      const b = rgb.slice(3, 4);
      obj.r = parseInt(r + r, 16);
      obj.g = parseInt(g + g, 16);
      obj.b = parseInt(b + b, 16);

    } else if (HEX.test(rgb)) {
      obj.r = parseInt(rgb.slice(1, 3), 16);
      obj.g = parseInt(rgb.slice(3, 5), 16);
      obj.b = parseInt(rgb.slice(5, 7), 16);

    } else {
      return null;
    }

    return obj;
  }

  static rgbToHsv(rgb) {
    // TODO
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

  constructor(rgb) {
    this.original = rgb;
    this.rgb = Color.parseRgb(rgb);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
