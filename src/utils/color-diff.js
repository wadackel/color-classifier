import convert from "color-convert"
import { radians, degrees, hypot, pow2, pow7 } from "./math"
const { abs, atan2, cos, pow, PI, min, exp, sqrt, sin } = Math;


export const AlgorithmTypes = {
  CIEDE2000: "CIEDE2000",
  HSV: "HSV",
  RGB: "RGB"
};

const diffMethodMap = {
  [AlgorithmTypes.CIEDE2000]: "ciede2000",
  [AlgorithmTypes.HSV]: "hsv",
  [AlgorithmTypes.RGB]: "rgb"
};

const kl = 1;
const kc = 1;
const kh = 1;
const pow7_25 = pow7(25);


export default class ColorDiff {
  static diff(algorithmType, color1, color2) {
    const method = diffMethodMap[algorithmType];
    return ColorDiff[method](color1, color2);
  }

  static ciede2000(color1, color2) {
    const a = convert.hex.lab(color1.hex);
    const b = convert.hex.lab(color2.hex);

    const [l1, a1, b1] = a;
    const [l2, a2, b2] = b;

    return ColorDiff._ciede2000(
      l1, a1, b1,
      l2, a2, b2
    );
  }

  static _ciede2000(l1, a1, b1, l2, a2, b2) {
    const c1 = hypot(a1, b1);
    const c2 = hypot(a2, b2);
    const ac1c2 = (c1 + c2) / 2;
    const g = 0.5 * (1 - sqrt(pow7(ac1c2) / (pow7(ac1c2) + pow7_25)));

    const a1p = (1 + g) * a1;
    const a2p = (1 + g) * a2;

    const c1p = sqrt(pow2(a1p) + pow2(b1));
    const c2p = sqrt(pow2(a2p) + pow2(b2));

    const h1pd = degrees(atan2(b1, a1p));
    const h1p = b1 === 0 && a1p === 0 ? 0 : h1pd > 0 ? h1pd : h1pd + 360;

    const h2pd = degrees(atan2(b2, a2p));
    const h2p = b2 === 0 && a2p === 0 ? 0 : h2pd > 0 ? h2pd : h2pd + 360;

    const dlp = l2 - l1;
    const dcp = c2p - c1p;
    const dhp = 2 * sqrt(c1p * c2p) * sin(radians(c1 * c2 === 0 ? 0 : abs(h2p - h1p) <= 180 ? h2p - h1p : (h2p - h1p) > 180 ? (h2p - h1p) - 360 : (h2p - h1p) + 360) / 2);

    const al = (l1 + l2) / 2;
    const acp = (c1p + c2p) / 2;

    let ahp;
    if (c1 * c2 === 0) {
      ahp = h1p + h2p;
    } else if(abs(h1p - h2p) <= 180) {
      ahp = (h1p + h2p) / 2;
    } else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) {
      ahp = (h1p + h2p + 360) / 2;
    } else {
      ahp = (h1p + h2p - 360) / 2;
    }

    const t = 1 - 0.17 * cos(radians(ahp - 30)) + 0.24 * cos(radians(2 * ahp)) + 0.32 * cos(radians(3 * ahp + 6)) - 0.20 * cos(radians(4 * ahp - 63));
    const dro = 30 * exp(-(pow2((ahp - 275) / 25)));
    const rc = sqrt((pow7(acp)) / (pow7(acp) + pow7_25));
    const sl = 1 + ((0.015 * pow2(al - 50)) / sqrt(20 + pow2(al - 50)));
    const sc = 1 + 0.045 * acp;
    const sh = 1 + 0.015 * acp * t;
    const rt = -2 * rc * sin(radians(2 * dro));

    return sqrt(pow2(dlp / (sl * kl)) + pow2(dcp / (sc * kc)) + pow2(dhp / (sh * kh)) + rt * (dcp / (sc * kc)) * (dhp / (sh * kh)));
  }

  static hsv(color1, color2) {
    const a = color1.hsv;
    const b = color1.hsv;
    let h = 0;

    if (a.h > b.h) {
      h = min(a.h - b.h, b.h - a.h + 360);
    } else {
      h = min(b.h - a.h, a.h - b.h + 360);
    }

    return sqrt(pow2(h) + pow2(a.s - b.s) + pow2(a.v - b.v));
  }

  static rgb(color1, color2) {
    const a = color1.rgb;
    const b = color2.rgb;
    return sqrt(pow2(a.r - b.r) + pow2(a.g - b.g) + pow2(a.b - b.b));
  }
}
