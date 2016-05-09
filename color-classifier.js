(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.ColorClassifier = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};

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

  babelHelpers;

  var HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
  var HEX = /^#([a-fA-F0-9]{6})$/;

  var Color = function () {
    babelHelpers.createClass(Color, null, [{
      key: "parseHex",
      value: function parseHex(hex) {
        var rgb = {};

        if (HEX_SHORT.test(hex)) {
          var r = hex.slice(1, 2);
          var g = hex.slice(2, 3);
          var b = hex.slice(3, 4);
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
    }, {
      key: "rgbToHsv",
      value: function rgbToHsv(rgb) {
        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;

        var hsv = {};
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;

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

        hsv.v = Math.round(max / 255 * 100);

        return hsv;
      }
    }, {
      key: "hsvDistance",
      value: function hsvDistance(a, b) {
        var hueDiff = 0;

        if (a.h > b.h) {
          hueDiff = Math.min(a.h - b.h, b.h - a.h + 360);
        } else {
          hueDiff = Math.min(b.h - a.h, a.h - b.h + 360);
        }

        return Math.sqrt(Math.pow(hueDiff, 2) + Math.pow(a.s - b.s, 2) + Math.pow(a.v - b.v, 2));
      }
    }, {
      key: "rgbDistance",
      value: function rgbDistance(a, b) {
        // TODO
      }
    }]);

    function Color(hex) {
      babelHelpers.classCallCheck(this, Color);

      this.original = rgb;
      this.rgb = Color.parseHex(hex);
      this.hsv = Color.rgbToHsv(this.rgb);
    }

    return Color;
  }();

  var base16Colors = ["#000000", "#808080", "#c0c0c0", "#ffffff", "#0000ff", "#000080", "#008080", "#008000", "#00ff00", "#00ffff", "#ffff00", "#ff0000", "#ff00ff", "#808000", "#800080", "#800000"];

  var ColorClassifier = function () {
    function ColorClassifier() {
      var baseColors = arguments.length <= 0 || arguments[0] === undefined ? base16Colors : arguments[0];
      babelHelpers.classCallCheck(this, ColorClassifier);

      console.log(new Color("#008080"));
      console.log(new Color("#00F"));
      console.log(new Color("#C0C0C0"));
      console.log(new Color("#fff"));

      // this.baseColors = baseColors.map(color => {
      //   return {
      //     hsv: Color(color).toHSV(),
      //     original: color
      //   };
      // });
    }

    babelHelpers.createClass(ColorClassifier, [{
      key: "getAppoximateColor",
      value: function getAppoximateColor(color) {
        // const array = [];
        //
        // forEach(this.baseColors, (baseColor) => {
        //   array.push({
        //     distance: this.getColorDistance(baseColor.hsv, color),
        //     color: baseColor.original
        //   });
        // });
        //
        // return minBy(array, "distance").color;
      }
    }, {
      key: "exec",
      value: function exec(colors) {
        // const results = {};
        //
        // forEach(this.baseColors, baseColor => results[baseColor.original] = []);
        //
        // forEach(colors, (color) => {
        //   const hsv = Color(color).toHSV();
        //   const baseColor = this.getAppoximateColor(hsv);
        //
        //   results[baseColor].push(color);
        // });
        //
        // return results;
      }
    }]);
    return ColorClassifier;
  }();

  ColorClassifier.base16Colors = base16Colors;

  return ColorClassifier;

}));