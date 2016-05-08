export default class Color {
  static parseRgb(rgb) {
  }

  static rgbToHsv(rgb) {
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
  }

  constructor(rgb) {
    this.original = rgb;
    this.rgb = Color.parseRgb(rgb);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
