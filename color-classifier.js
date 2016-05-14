
/*!
 * color-classifier
 * Classify the color along the reference color.
 *
 * @author tsuyoshiwada
 * @license MIT
 * @version 0.0.1
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ColorClassifier = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers.defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  babelHelpers.slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  babelHelpers.toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  babelHelpers;

  function minBy(array, key) {
    var sortedArray = [].concat(babelHelpers.toConsumableArray(array));

    sortedArray.sort(function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });

    return sortedArray.shift();
  }

  var HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
  var HEX = /^#([a-fA-F0-9]{6})$/;

  function roundColors(obj, round) {
    if (!round) return obj;

    var o = {};
    for (var k in obj) {
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

  var Color = function () {
    babelHelpers.createClass(Color, null, [{
      key: "normalizeHex",
      value: function normalizeHex(hex) {
        if (HEX.test(hex)) {
          return hex;
        } else if (HEX_SHORT.test(hex)) {
          var r = hex.slice(1, 2);
          var g = hex.slice(2, 3);
          var b = hex.slice(3, 4);
          return "#" + (r + r) + (g + g) + (b + b);
        }

        return null;
      }
    }, {
      key: "hexToRgb",
      value: function hexToRgb(hex) {
        var normalizedHex = this.normalizeHex(hex);

        if (normalizedHex == null) {
          return null;
        }

        var m = normalizedHex.match(HEX);
        var i = parseInt(m[1], 16);
        var r = i >> 16 & 0xFF;
        var g = i >> 8 & 0xFF;
        var b = i & 0xFF;

        return { r: r, g: g, b: b };
      }
    }, {
      key: "rgbToHex",
      value: function rgbToHex(rgb) {
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;

        var i = ((Math.round(r) & 0xFF) << 16) + ((Math.round(g) & 0xFF) << 8) + (Math.round(b) & 0xFF);
        var s = i.toString(16).toLowerCase();
        return "#" + ("000000".substring(s.length) + s);
      }
    }, {
      key: "rgbToHsv",
      value: function rgbToHsv(rgb) {
        var round = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var hsv = {};

        if (max === 0) {
          hsv.s = 0;
        } else {
          hsv.s = delta / max * 1000 / 10;
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

        hsv.v = max / 255 * 1000 / 10;

        return roundColors(hsv, round);
      }
    }, {
      key: "rgbToXyz",
      value: function rgbToXyz(rgb) {
        var round = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var r = rgb.r / 255;
        var g = rgb.g / 255;
        var b = rgb.b / 255;

        var rr = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
        var gg = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
        var bb = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

        var x = (rr * 0.4124 + gg * 0.3576 + bb * 0.1805) * 100;
        var y = (rr * 0.2126 + gg * 0.7152 + bb * 0.0722) * 100;
        var z = (rr * 0.0193 + gg * 0.1192 + bb * 0.9505) * 100;

        return roundColors({ x: x, y: y, z: z }, round);
      }
    }, {
      key: "rgbToLab",
      value: function rgbToLab(rgb) {
        var round = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var xyz = Color.rgbToXyz(rgb, false);
        var x = xyz.x;
        var y = xyz.y;
        var z = xyz.z;


        x /= 95.047;
        y /= 100;
        z /= 108.883;

        x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

        var l = 116 * y - 16;
        var a = 500 * (x - y);
        var b = 200 * (y - z);

        return roundColors({ l: l, a: a, b: b }, round);
      }
    }]);

    function Color(value) {
      babelHelpers.classCallCheck(this, Color);

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

    return Color;
  }();

  function radians(n) {
    return n * Math.PI / 180;
  }

  function degrees(n) {
    return n * (180 / Math.PI);
  }

  function hypot(a, b) {
    return Math.sqrt(a * a + b * b);
  }

  function pow2(n) {
    return n * n;
  }

  function pow7(n) {
    return n * n * n * n * n * n * n;
  }

  var _diffMethodMap;

  var abs = Math.abs;
  var atan2 = Math.atan2;
  var cos = Math.cos;
  var min = Math.min;
  var exp = Math.exp;
  var sqrt = Math.sqrt;
  var sin = Math.sin;


  var AlgorithmTypes = {
    CIEDE2000: "CIEDE2000",
    HSV: "HSV",
    RGB: "RGB"
  };

  var diffMethodMap = (_diffMethodMap = {}, babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes.CIEDE2000, "ciede2000"), babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes.HSV, "hsv"), babelHelpers.defineProperty(_diffMethodMap, AlgorithmTypes.RGB, "rgb"), _diffMethodMap);

  var kl = 1;
  var kc = 1;
  var kh = 1;
  var pow7_25 = pow7(25);

  var ColorDiff = function () {
    function ColorDiff() {
      babelHelpers.classCallCheck(this, ColorDiff);
    }

    babelHelpers.createClass(ColorDiff, null, [{
      key: "diff",
      value: function diff(algorithmType, color1, color2) {
        var method = diffMethodMap[algorithmType];
        return ColorDiff[method](color1, color2);
      }
    }, {
      key: "ciede2000",
      value: function ciede2000(color1, color2) {
        var a = Color.rgbToLab(color1.rgb);
        var b = Color.rgbToLab(color2.rgb);

        return ColorDiff._ciede2000(a.l, a.a, a.b, b.l, b.a, b.b);
      }
    }, {
      key: "_ciede2000",
      value: function _ciede2000(l1, a1, b1, l2, a2, b2) {
        var c1 = hypot(a1, b1);
        var c2 = hypot(a2, b2);
        var ac1c2 = (c1 + c2) / 2;
        var g = 0.5 * (1 - sqrt(pow7(ac1c2) / (pow7(ac1c2) + pow7_25)));

        var a1p = (1 + g) * a1;
        var a2p = (1 + g) * a2;

        var c1p = sqrt(pow2(a1p) + pow2(b1));
        var c2p = sqrt(pow2(a2p) + pow2(b2));

        var h1pd = degrees(atan2(b1, a1p));
        var h1p = b1 === 0 && a1p === 0 ? 0 : h1pd > 0 ? h1pd : h1pd + 360;

        var h2pd = degrees(atan2(b2, a2p));
        var h2p = b2 === 0 && a2p === 0 ? 0 : h2pd > 0 ? h2pd : h2pd + 360;

        var dlp = l2 - l1;
        var dcp = c2p - c1p;
        var dhp = 2 * sqrt(c1p * c2p) * sin(radians(c1 * c2 === 0 ? 0 : abs(h2p - h1p) <= 180 ? h2p - h1p : h2p - h1p > 180 ? h2p - h1p - 360 : h2p - h1p + 360) / 2);

        var al = (l1 + l2) / 2;
        var acp = (c1p + c2p) / 2;

        var ahp = void 0;
        if (c1 * c2 === 0) {
          ahp = h1p + h2p;
        } else if (abs(h1p - h2p) <= 180) {
          ahp = (h1p + h2p) / 2;
        } else if (abs(h1p - h2p) > 180 && h1p + h2p < 360) {
          ahp = (h1p + h2p + 360) / 2;
        } else {
          ahp = (h1p + h2p - 360) / 2;
        }

        var t = 1 - 0.17 * cos(radians(ahp - 30)) + 0.24 * cos(radians(2 * ahp)) + 0.32 * cos(radians(3 * ahp + 6)) - 0.20 * cos(radians(4 * ahp - 63));
        var dro = 30 * exp(-pow2((ahp - 275) / 25));
        var rc = sqrt(pow7(acp) / (pow7(acp) + pow7_25));
        var sl = 1 + 0.015 * pow2(al - 50) / sqrt(20 + pow2(al - 50));
        var sc = 1 + 0.045 * acp;
        var sh = 1 + 0.015 * acp * t;
        var rt = -2 * rc * sin(radians(2 * dro));

        return sqrt(pow2(dlp / (sl * kl)) + pow2(dcp / (sc * kc)) + pow2(dhp / (sh * kh)) + rt * (dcp / (sc * kc)) * (dhp / (sh * kh)));
      }
    }, {
      key: "hsv",
      value: function hsv(color1, color2) {
        var a = color1.hsv;
        var b = color2.hsv;
        var h = 0;

        if (a.h > b.h) {
          h = min(a.h - b.h, b.h - a.h + 360);
        } else {
          h = min(b.h - a.h, a.h - b.h + 360);
        }

        return sqrt(pow2(h) + pow2(a.s - b.s) + pow2(a.v - b.v));
      }
    }, {
      key: "rgb",
      value: function rgb(color1, color2) {
        var a = color1.rgb;
        var b = color2.rgb;
        return sqrt(pow2(a.r - b.r) + pow2(a.g - b.g) + pow2(a.b - b.b));
      }
    }]);
    return ColorDiff;
  }();

  // https://www.w3.org/TR/css3-color/#html4
  var W3C = ["#000000", "#808080", "#c0c0c0", "#ffffff", "#800000", "#ff0000", "#008000", "#00ff00", "#808000", "#ffff00", "#008080", "#00ffff", "#000080", "#0000ff", "#800080", "#ff00ff"];

  var RAINBOW = ["#000000", "#808080", "#ffffff", "#ff0000", "#ffa500", "#ffff00", "#008000", "#00ffff", "#0000ff", "#800080"];



  var Palette = Object.freeze({
  	W3C: W3C,
  	RAINBOW: RAINBOW
  });

  function equal(a, b) {
    if (a === b) return true;

    var ka = void 0;
    var kb = void 0;
    try {
      ka = Object.keys(a);
      kb = Object.keys(b);
    } catch (e) {
      return false;
    }

    if (ka.length !== kb.length) return false;

    for (var i = 0; ka.length - 1; i++) {
      var key = ka[i];
      if (a[key] !== b[key]) return false;
    }

    return (typeof a === "undefined" ? "undefined" : babelHelpers.typeof(a)) === (typeof b === "undefined" ? "undefined" : babelHelpers.typeof(b));
  }

  var ColorClassifier = function () {
    babelHelpers.createClass(ColorClassifier, null, [{
      key: "throwError",
      value: function throwError(msg) {
        throw new Error("[ColorClassifier] " + msg);
      }
    }]);

    function ColorClassifier() {
      var palette = arguments.length <= 0 || arguments[0] === undefined ? W3C : arguments[0];
      var algorithmType = arguments.length <= 1 || arguments[1] === undefined ? AlgorithmTypes.CIEDE2000 : arguments[1];
      babelHelpers.classCallCheck(this, ColorClassifier);

      this.setPalette(palette);
      this.setAlgorithmType(algorithmType);
    }

    babelHelpers.createClass(ColorClassifier, [{
      key: "setPalette",
      value: function setPalette(palette) {
        if (!Array.isArray(palette)) {
          ColorClassifier.throwError("palette is should be a Array.");
        }
        this.palette = palette.map(function (c) {
          return new Color(c);
        });
      }
    }, {
      key: "getPalette",
      value: function getPalette() {
        return this.palette;
      }
    }, {
      key: "setAlgorithmType",
      value: function setAlgorithmType(algorithmType) {
        if (!AlgorithmTypes.hasOwnProperty(algorithmType)) {
          ColorClassifier.throwError(algorithmType + " is an undefined algorithm type.");
        }
        this.algorithmType = algorithmType;
      }
    }, {
      key: "getAlgorithmType",
      value: function getAlgorithmType() {
        return this.algorithmType;
      }
    }, {
      key: "classify",
      value: function classify(value) {
        var format = arguments.length <= 1 || arguments[1] === undefined ? "rgb" : arguments[1];
        var palette = this.palette;
        var algorithmType = this.algorithmType;

        var color = new Color(value);
        var array = [];

        palette.forEach(function (paletteColor) {
          array.push({
            distance: ColorDiff.diff(algorithmType, paletteColor, color),
            color: format === "raw" ? paletteColor : paletteColor[format]
          });
        });

        return minBy(array, "distance").color;
      }
    }, {
      key: "classifyFromArray",
      value: function classifyFromArray(array) {
        var _this = this;

        var format = arguments.length <= 1 || arguments[1] === undefined ? "rgb" : arguments[1];

        var results = [];
        var tmpArray = [];

        array.forEach(function (value) {
          var color = new Color(value);
          var palette = _this.classify(color.rgb, "raw");
          tmpArray.push({ palette: palette, color: color });
        });

        tmpArray.forEach(function (obj) {
          var palette = obj.palette;
          var color = obj.color;

          var _results$filter = results.filter(function (o) {
            return equal(o.palette ? o.palette[format] : null, palette[format]);
          });

          var _results$filter2 = babelHelpers.slicedToArray(_results$filter, 1);

          var paletteColor = _results$filter2[0];


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
    }]);
    return ColorClassifier;
  }();

  ColorClassifier.Palette = Palette;
  ColorClassifier.AlgorithmTypes = AlgorithmTypes;

  return ColorClassifier;

}));