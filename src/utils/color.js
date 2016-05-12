import convert from "color-convert"
import radians from "./radians"

const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

const v25_7 = Math.pow(25, 7);
const d6 = radians(6);
const d25 = radians(25);
const d30 = radians(30);
const d60 = radians(60);
const d63 = radians(63);
const d275 = radians(275);
const kl = 1;
const kc = 1;
const kh = 1;

const m = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505]
];

const m11 = m[0][0];
const m12 = m[0][1];
const m13 = m[0][2];
const m21 = m[1][0];
const m22 = m[1][1];
const m23 = m[1][2];
const m31 = m[2][0];
const m32 = m[2][1];
const m33 = m[2][2];

const d = m11 * m22 * m33
  + m21 * m32 * m13
  + m31 * m12 * m23
  - m11 * m32 * m23
  - m31 * m22 * m13
  - m21 * m12 * m33;

const mi = [
  [(m22 * m33 - m23 * m32) / d, (m13 * m32 - m12 * m33) / d, (m12 * m23 - m13 * m22) / d],
  [(m23 * m31 - m21 * m33) / d, (m11 * m33 - m13 * m31) / d, (m13 * m21 - m11 * m23) / d],
  [(m21 * m32 - m22 * m31) / d, (m12 * m31 - m11 * m32) / d, (m11 * m22 - m12 * m21) / d]
];


export const AlgorithmTypes = {
  CIEDE2000: "CIEDE2000",
  HSV: "HSV",
  RGB: "RGB"
};

const distanceMethodMap = {
  [AlgorithmTypes.CIEDE2000]: "ciede2kDistance",
  [AlgorithmTypes.HSV]: "hsvDistance",
  [AlgorithmTypes.RGB]: "rgbDistance"
};

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

  static distance(color1, color2, algorithmType) {
    return Color[distanceMethodMap[algorithmType]](color1, color2);
  }

  static rgbDistance(color1, color2) {
    const a = color1.rgb;
    const b = color2.rgb;

    return Math.sqrt(
      Math.pow(a.r - b.r, 2)
      + Math.pow(a.g - b.g, 2)
      + Math.pow(a.b - b.b, 2)
    );
  }

  static hsvDistance(color1, color2) {
    const a = color1.hsv;
    const b = color1.hsv;
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

  static ciede2kDistance(color1, color2) {
    const a = convert.hex.lab(color1.hex);
    const b = convert.hex.lab(color2.hex);

    const l1 = a[0];
    const a1 = a[1];
    const b1 = a[2];

    const l2 = b[0];
    const a2 = b[1];
    const b2 = b[2];

    return Color._ciede2kDistance(
      l1, a1, b1,
      l2, a2, b2
    );
  }

  static _ciede2kDistance(l1, a1, b1, l2, a2, b2) {
    const dld = l2 - l1;
    const lb = (l1 + l2) / 2;

    const cs1 = Math.hypot(a1, b1);
    const cs2 = Math.hypot(a2, b2);
    const cb = (cs1 + cs2) / 2;
    const cb7 = Math.pow(cb, 7);
    const ad1 = a1 + a1 / 2 * (1 - Math.sqrt(cb7 / (cb7 + v25_7)));
    const ad2 = a2 + a2 / 2 * (1 - Math.sqrt(cb7 / (cb7 + v25_7)));

    const cd1 = Math.hypot(ad1, b1);
    const cd2 = Math.hypot(ad2, b2);
    const cbd = (cd1 + cd2) / 2;
    const cbd7 = Math.pow(cbd, 7);

    const dcd = (cd2 - cd1);
    let hd1 = b1 === 0 && ad1 === 0 ? 0 : Math.atan2(b1, ad1);
    if (hd1 < 0) {
      hd1 += Math.PI * 2;
    }
    let hd2 = b2 === 0 && ad2 === 0 ? 0 : Math.atan2(b2, ad2);
    if (hd2 < 0) {
      hd2 += Math.PI * 2;
    }

    let dhd = hd2 - hd1;
    if (cd1 * cd2 === 0) {
      dhd = 0;
    } else if (Math.abs(hd1 - hd2) > Math.PI) {
      if (hd2 <= hd1) {
        dhd += Math.PI * 2;
      } else {
        dhd -= Math.PI * 2;
      }
    }

    const dhhd = 2 * Math.sqrt(cd1 * cd2) * Math.sin(dhd / 2);
    let hhbd = 0;
    if (cd1 * cd2 !== 0) {
      hhbd = Math.abs(hd1 - hd2) > Math.PI ? (hd1 + hd2 + Math.PI * 2) / 2 :(hd1 + hd2) / 2;
    }

    const tt = 1
      - 0.17 * Math.cos(hhbd - d30)
      + 0.24 * Math.cos(2 * hhbd)
      + 0.32 * Math.cos(3 * hhbd + d6)
      - 0.20 * Math.cos(4 * hhbd - d63);

    const lb50_2 = Math.pow(lb - 50, 2);
    const ssl = 1 + (0.0015 * lb50_2) / Math.sqrt(20 + lb50_2);
    const ssc = 1 + 0.045 * cbd;
    const ssh = 1 + 0.015 * cbd * tt;
    const rrt = -2 * Math.sqrt(cbd7 / (cbd7 + v25_7)) * Math.sin(d60 * Math.exp(- Math.pow((hhbd - d275) / d25, 2)));
    const de = Math.pow(dld / (kl * ssl), 2)
      + Math.pow(dcd / (kc * ssc), 2)
      + Math.pow(dhhd / (kh * ssh), 2)
      + rrt * (dcd / (kc * ssc)) * (dhhd / (kh * ssh));

    return Math.sqrt(de);
  }

  constructor(hex) {
    this.original = hex;
    this.hex = Color.normalizeHex(hex);
    this.rgb = Color.parseHex(this.hex);
    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
