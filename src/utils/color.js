const HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
const HEX = /^#([a-fA-F0-9]{6})$/;

function roundColors(obj, round) {
  if (!round) return obj;

  const o = {};
  for (let k in obj) {
    o[k] = Math.round(obj[k]);
  }
  return o;
}

function hasProp(obj, key) {
  return obj.hasOwnProperty(key);
}

function isRgb(obj) {
  return hasProp(obj, "r") && hasProp(obj, "g") && hasProp(obj, "b");
}


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

    return { r, g, b };
  }

  static rgbToHex(rgb) {
    const { r, g, b} = rgb;
    const i = ((Math.round(r) & 0xFF) << 16) + ((Math.round(g) & 0xFF) << 8) + (Math.round(b) & 0xFF);
    const s = i.toString(16).toLowerCase();
    return `#${"000000".substring(s.length) + s}`;
  }

  static rgbToHsv(rgb, round = true) {
    const { r, g, b } = rgb;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    const hsv = {};

    if (max === 0) {
      hsv.s = 0;
    } else {
      hsv.s = (delta / max * 1000) / 10;
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

    hsv.h = Math.min(hsv.h * 60, 360);
    hsv.h = hsv.h < 0 ? hsv.h + 360 : hsv.h;

    hsv.v = ((max / 255) * 1000) / 10;

    return roundColors(hsv, round);
  }

  static rgbToXyz(rgb, round = true) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const rr = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : r / 12.92;
    const gg = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : g / 12.92;
    const bb = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : b / 12.92;

    const x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) * 100;
    const y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) * 100;
    const z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) * 100;

    return roundColors({ x, y, z }, round);
  }

  static rgbToLab(rgb, round = true) {
    const xyz = Color.rgbToXyz(rgb, false);
    let { x, y, z } = xyz;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    const l = (116 * y) - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return roundColors({ l, a, b }, round);
  }

  constructor(value) {
    this.original = value;

    if (isRgb(value)) {
      this.rgb = value;
      this.hex = Color.rgbToHex(value);

    } else {
      this.hex = Color.normalizeHex(value);
      this.rgb = Color.hexToRgb(this.hex);
    }

    this.hsv = Color.rgbToHsv(this.rgb);
  }
}
