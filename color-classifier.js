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

  var Color = function () {
    babelHelpers.createClass(Color, null, [{
      key: "parseRgb",
      value: function parseRgb(rgb) {}
    }, {
      key: "rgbToHsv",
      value: function rgbToHsv(rgb) {}
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
      value: function rgbDistance(a, b) {}
    }]);

    function Color(rgb) {
      babelHelpers.classCallCheck(this, Color);

      this.original = rgb;
      this.rgb = Color.parseRgb(rgb);
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