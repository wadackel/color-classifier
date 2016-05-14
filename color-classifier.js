
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

	function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports), module.exports; }


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

	var cssKeywords = __commonjs(function (module) {
		module.exports = {
			aliceblue: [240, 248, 255],
			antiquewhite: [250, 235, 215],
			aqua: [0, 255, 255],
			aquamarine: [127, 255, 212],
			azure: [240, 255, 255],
			beige: [245, 245, 220],
			bisque: [255, 228, 196],
			black: [0, 0, 0],
			blanchedalmond: [255, 235, 205],
			blue: [0, 0, 255],
			blueviolet: [138, 43, 226],
			brown: [165, 42, 42],
			burlywood: [222, 184, 135],
			cadetblue: [95, 158, 160],
			chartreuse: [127, 255, 0],
			chocolate: [210, 105, 30],
			coral: [255, 127, 80],
			cornflowerblue: [100, 149, 237],
			cornsilk: [255, 248, 220],
			crimson: [220, 20, 60],
			cyan: [0, 255, 255],
			darkblue: [0, 0, 139],
			darkcyan: [0, 139, 139],
			darkgoldenrod: [184, 134, 11],
			darkgray: [169, 169, 169],
			darkgreen: [0, 100, 0],
			darkgrey: [169, 169, 169],
			darkkhaki: [189, 183, 107],
			darkmagenta: [139, 0, 139],
			darkolivegreen: [85, 107, 47],
			darkorange: [255, 140, 0],
			darkorchid: [153, 50, 204],
			darkred: [139, 0, 0],
			darksalmon: [233, 150, 122],
			darkseagreen: [143, 188, 143],
			darkslateblue: [72, 61, 139],
			darkslategray: [47, 79, 79],
			darkslategrey: [47, 79, 79],
			darkturquoise: [0, 206, 209],
			darkviolet: [148, 0, 211],
			deeppink: [255, 20, 147],
			deepskyblue: [0, 191, 255],
			dimgray: [105, 105, 105],
			dimgrey: [105, 105, 105],
			dodgerblue: [30, 144, 255],
			firebrick: [178, 34, 34],
			floralwhite: [255, 250, 240],
			forestgreen: [34, 139, 34],
			fuchsia: [255, 0, 255],
			gainsboro: [220, 220, 220],
			ghostwhite: [248, 248, 255],
			gold: [255, 215, 0],
			goldenrod: [218, 165, 32],
			gray: [128, 128, 128],
			green: [0, 128, 0],
			greenyellow: [173, 255, 47],
			grey: [128, 128, 128],
			honeydew: [240, 255, 240],
			hotpink: [255, 105, 180],
			indianred: [205, 92, 92],
			indigo: [75, 0, 130],
			ivory: [255, 255, 240],
			khaki: [240, 230, 140],
			lavender: [230, 230, 250],
			lavenderblush: [255, 240, 245],
			lawngreen: [124, 252, 0],
			lemonchiffon: [255, 250, 205],
			lightblue: [173, 216, 230],
			lightcoral: [240, 128, 128],
			lightcyan: [224, 255, 255],
			lightgoldenrodyellow: [250, 250, 210],
			lightgray: [211, 211, 211],
			lightgreen: [144, 238, 144],
			lightgrey: [211, 211, 211],
			lightpink: [255, 182, 193],
			lightsalmon: [255, 160, 122],
			lightseagreen: [32, 178, 170],
			lightskyblue: [135, 206, 250],
			lightslategray: [119, 136, 153],
			lightslategrey: [119, 136, 153],
			lightsteelblue: [176, 196, 222],
			lightyellow: [255, 255, 224],
			lime: [0, 255, 0],
			limegreen: [50, 205, 50],
			linen: [250, 240, 230],
			magenta: [255, 0, 255],
			maroon: [128, 0, 0],
			mediumaquamarine: [102, 205, 170],
			mediumblue: [0, 0, 205],
			mediumorchid: [186, 85, 211],
			mediumpurple: [147, 112, 219],
			mediumseagreen: [60, 179, 113],
			mediumslateblue: [123, 104, 238],
			mediumspringgreen: [0, 250, 154],
			mediumturquoise: [72, 209, 204],
			mediumvioletred: [199, 21, 133],
			midnightblue: [25, 25, 112],
			mintcream: [245, 255, 250],
			mistyrose: [255, 228, 225],
			moccasin: [255, 228, 181],
			navajowhite: [255, 222, 173],
			navy: [0, 0, 128],
			oldlace: [253, 245, 230],
			olive: [128, 128, 0],
			olivedrab: [107, 142, 35],
			orange: [255, 165, 0],
			orangered: [255, 69, 0],
			orchid: [218, 112, 214],
			palegoldenrod: [238, 232, 170],
			palegreen: [152, 251, 152],
			paleturquoise: [175, 238, 238],
			palevioletred: [219, 112, 147],
			papayawhip: [255, 239, 213],
			peachpuff: [255, 218, 185],
			peru: [205, 133, 63],
			pink: [255, 192, 203],
			plum: [221, 160, 221],
			powderblue: [176, 224, 230],
			purple: [128, 0, 128],
			rebeccapurple: [102, 51, 153],
			red: [255, 0, 0],
			rosybrown: [188, 143, 143],
			royalblue: [65, 105, 225],
			saddlebrown: [139, 69, 19],
			salmon: [250, 128, 114],
			sandybrown: [244, 164, 96],
			seagreen: [46, 139, 87],
			seashell: [255, 245, 238],
			sienna: [160, 82, 45],
			silver: [192, 192, 192],
			skyblue: [135, 206, 235],
			slateblue: [106, 90, 205],
			slategray: [112, 128, 144],
			slategrey: [112, 128, 144],
			snow: [255, 250, 250],
			springgreen: [0, 255, 127],
			steelblue: [70, 130, 180],
			tan: [210, 180, 140],
			teal: [0, 128, 128],
			thistle: [216, 191, 216],
			tomato: [255, 99, 71],
			turquoise: [64, 224, 208],
			violet: [238, 130, 238],
			wheat: [245, 222, 179],
			white: [255, 255, 255],
			whitesmoke: [245, 245, 245],
			yellow: [255, 255, 0],
			yellowgreen: [154, 205, 50]
		};
	});

	var require$$0$2 = cssKeywords && (typeof cssKeywords === 'undefined' ? 'undefined' : babelHelpers.typeof(cssKeywords)) === 'object' && 'default' in cssKeywords ? cssKeywords['default'] : cssKeywords;

	var conversions = __commonjs(function (module) {
		/* MIT license */
		var cssKeywords = require$$0$2;

		// NOTE: conversions should only return primitive values (i.e. arrays, or
		//       values that give correct `typeof` results).
		//       do not use box values types (i.e. Number(), String(), etc.)

		var reverseKeywords = {};
		for (var key in cssKeywords) {
			if (cssKeywords.hasOwnProperty(key)) {
				reverseKeywords[cssKeywords[key].join()] = key;
			}
		}

		var convert = module.exports = {
			rgb: { channels: 3 },
			hsl: { channels: 3 },
			hsv: { channels: 3 },
			hwb: { channels: 3 },
			cmyk: { channels: 4 },
			xyz: { channels: 3 },
			lab: { channels: 3 },
			lch: { channels: 3 },
			hex: { channels: 1 },
			keyword: { channels: 1 },
			ansi16: { channels: 1 },
			ansi256: { channels: 1 },
			hcg: { channels: 3 },
			apple: { channels: 3 }
		};

		// hide .channels property
		for (var model in convert) {
			if (convert.hasOwnProperty(model)) {
				if (!('channels' in convert[model])) {
					throw new Error('missing channels property: ' + model);
				}

				var channels = convert[model].channels;
				delete convert[model].channels;
				Object.defineProperty(convert[model], 'channels', { value: channels });
			}
		}

		convert.rgb.hsl = function (rgb) {
			var r = rgb[0] / 255;
			var g = rgb[1] / 255;
			var b = rgb[2] / 255;
			var min = Math.min(r, g, b);
			var max = Math.max(r, g, b);
			var delta = max - min;
			var h;
			var s;
			var l;

			if (max === min) {
				h = 0;
			} else if (r === max) {
				h = (g - b) / delta;
			} else if (g === max) {
				h = 2 + (b - r) / delta;
			} else if (b === max) {
				h = 4 + (r - g) / delta;
			}

			h = Math.min(h * 60, 360);

			if (h < 0) {
				h += 360;
			}

			l = (min + max) / 2;

			if (max === min) {
				s = 0;
			} else if (l <= 0.5) {
				s = delta / (max + min);
			} else {
				s = delta / (2 - max - min);
			}

			return [h, s * 100, l * 100];
		};

		convert.rgb.hsv = function (rgb) {
			var r = rgb[0];
			var g = rgb[1];
			var b = rgb[2];
			var min = Math.min(r, g, b);
			var max = Math.max(r, g, b);
			var delta = max - min;
			var h;
			var s;
			var v;

			if (max === 0) {
				s = 0;
			} else {
				s = delta / max * 1000 / 10;
			}

			if (max === min) {
				h = 0;
			} else if (r === max) {
				h = (g - b) / delta;
			} else if (g === max) {
				h = 2 + (b - r) / delta;
			} else if (b === max) {
				h = 4 + (r - g) / delta;
			}

			h = Math.min(h * 60, 360);

			if (h < 0) {
				h += 360;
			}

			v = max / 255 * 1000 / 10;

			return [h, s, v];
		};

		convert.rgb.hwb = function (rgb) {
			var r = rgb[0];
			var g = rgb[1];
			var b = rgb[2];
			var h = convert.rgb.hsl(rgb)[0];
			var w = 1 / 255 * Math.min(r, Math.min(g, b));

			b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

			return [h, w * 100, b * 100];
		};

		convert.rgb.cmyk = function (rgb) {
			var r = rgb[0] / 255;
			var g = rgb[1] / 255;
			var b = rgb[2] / 255;
			var c;
			var m;
			var y;
			var k;

			k = Math.min(1 - r, 1 - g, 1 - b);
			c = (1 - r - k) / (1 - k) || 0;
			m = (1 - g - k) / (1 - k) || 0;
			y = (1 - b - k) / (1 - k) || 0;

			return [c * 100, m * 100, y * 100, k * 100];
		};

		convert.rgb.keyword = function (rgb) {
			return reverseKeywords[rgb.join()];
		};

		convert.keyword.rgb = function (keyword) {
			return cssKeywords[keyword];
		};

		convert.rgb.xyz = function (rgb) {
			var r = rgb[0] / 255;
			var g = rgb[1] / 255;
			var b = rgb[2] / 255;

			// assume sRGB
			r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
			g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
			b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

			var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
			var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
			var z = r * 0.0193 + g * 0.1192 + b * 0.9505;

			return [x * 100, y * 100, z * 100];
		};

		convert.rgb.lab = function (rgb) {
			var xyz = convert.rgb.xyz(rgb);
			var x = xyz[0];
			var y = xyz[1];
			var z = xyz[2];
			var l;
			var a;
			var b;

			x /= 95.047;
			y /= 100;
			z /= 108.883;

			x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
			y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
			z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

			l = 116 * y - 16;
			a = 500 * (x - y);
			b = 200 * (y - z);

			return [l, a, b];
		};

		convert.hsl.rgb = function (hsl) {
			var h = hsl[0] / 360;
			var s = hsl[1] / 100;
			var l = hsl[2] / 100;
			var t1;
			var t2;
			var t3;
			var rgb;
			var val;

			if (s === 0) {
				val = l * 255;
				return [val, val, val];
			}

			if (l < 0.5) {
				t2 = l * (1 + s);
			} else {
				t2 = l + s - l * s;
			}

			t1 = 2 * l - t2;

			rgb = [0, 0, 0];
			for (var i = 0; i < 3; i++) {
				t3 = h + 1 / 3 * -(i - 1);
				if (t3 < 0) {
					t3++;
				}
				if (t3 > 1) {
					t3--;
				}

				if (6 * t3 < 1) {
					val = t1 + (t2 - t1) * 6 * t3;
				} else if (2 * t3 < 1) {
					val = t2;
				} else if (3 * t3 < 2) {
					val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
				} else {
					val = t1;
				}

				rgb[i] = val * 255;
			}

			return rgb;
		};

		convert.hsl.hsv = function (hsl) {
			var h = hsl[0];
			var s = hsl[1] / 100;
			var l = hsl[2] / 100;
			var sv;
			var v;

			if (l === 0) {
				// no need to do calc on black
				// also avoids divide by 0 error
				return [0, 0, 0];
			}

			l *= 2;
			s *= l <= 1 ? l : 2 - l;
			v = (l + s) / 2;
			sv = 2 * s / (l + s);

			return [h, sv * 100, v * 100];
		};

		convert.hsv.rgb = function (hsv) {
			var h = hsv[0] / 60;
			var s = hsv[1] / 100;
			var v = hsv[2] / 100;
			var hi = Math.floor(h) % 6;

			var f = h - Math.floor(h);
			var p = 255 * v * (1 - s);
			var q = 255 * v * (1 - s * f);
			var t = 255 * v * (1 - s * (1 - f));
			v *= 255;

			switch (hi) {
				case 0:
					return [v, t, p];
				case 1:
					return [q, v, p];
				case 2:
					return [p, v, t];
				case 3:
					return [p, q, v];
				case 4:
					return [t, p, v];
				case 5:
					return [v, p, q];
			}
		};

		convert.hsv.hsl = function (hsv) {
			var h = hsv[0];
			var s = hsv[1] / 100;
			var v = hsv[2] / 100;
			var sl;
			var l;

			l = (2 - s) * v;
			sl = s * v;
			sl /= l <= 1 ? l : 2 - l;
			sl = sl || 0;
			l /= 2;

			return [h, sl * 100, l * 100];
		};

		// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
		convert.hwb.rgb = function (hwb) {
			var h = hwb[0] / 360;
			var wh = hwb[1] / 100;
			var bl = hwb[2] / 100;
			var ratio = wh + bl;
			var i;
			var v;
			var f;
			var n;

			// wh + bl cant be > 1
			if (ratio > 1) {
				wh /= ratio;
				bl /= ratio;
			}

			i = Math.floor(6 * h);
			v = 1 - bl;
			f = 6 * h - i;

			if ((i & 0x01) !== 0) {
				f = 1 - f;
			}

			n = wh + f * (v - wh); // linear interpolation

			var r;
			var g;
			var b;
			switch (i) {
				default:
				case 6:
				case 0:
					r = v;g = n;b = wh;break;
				case 1:
					r = n;g = v;b = wh;break;
				case 2:
					r = wh;g = v;b = n;break;
				case 3:
					r = wh;g = n;b = v;break;
				case 4:
					r = n;g = wh;b = v;break;
				case 5:
					r = v;g = wh;b = n;break;
			}

			return [r * 255, g * 255, b * 255];
		};

		convert.cmyk.rgb = function (cmyk) {
			var c = cmyk[0] / 100;
			var m = cmyk[1] / 100;
			var y = cmyk[2] / 100;
			var k = cmyk[3] / 100;
			var r;
			var g;
			var b;

			r = 1 - Math.min(1, c * (1 - k) + k);
			g = 1 - Math.min(1, m * (1 - k) + k);
			b = 1 - Math.min(1, y * (1 - k) + k);

			return [r * 255, g * 255, b * 255];
		};

		convert.xyz.rgb = function (xyz) {
			var x = xyz[0] / 100;
			var y = xyz[1] / 100;
			var z = xyz[2] / 100;
			var r;
			var g;
			var b;

			r = x * 3.2406 + y * -1.5372 + z * -0.4986;
			g = x * -0.9689 + y * 1.8758 + z * 0.0415;
			b = x * 0.0557 + y * -0.2040 + z * 1.0570;

			// assume sRGB
			r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r *= 12.92;

			g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g *= 12.92;

			b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b *= 12.92;

			r = Math.min(Math.max(0, r), 1);
			g = Math.min(Math.max(0, g), 1);
			b = Math.min(Math.max(0, b), 1);

			return [r * 255, g * 255, b * 255];
		};

		convert.xyz.lab = function (xyz) {
			var x = xyz[0];
			var y = xyz[1];
			var z = xyz[2];
			var l;
			var a;
			var b;

			x /= 95.047;
			y /= 100;
			z /= 108.883;

			x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
			y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
			z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

			l = 116 * y - 16;
			a = 500 * (x - y);
			b = 200 * (y - z);

			return [l, a, b];
		};

		convert.lab.xyz = function (lab) {
			var l = lab[0];
			var a = lab[1];
			var b = lab[2];
			var x;
			var y;
			var z;
			var y2;

			if (l <= 8) {
				y = l * 100 / 903.3;
				y2 = 7.787 * (y / 100) + 16 / 116;
			} else {
				y = 100 * Math.pow((l + 16) / 116, 3);
				y2 = Math.pow(y / 100, 1 / 3);
			}

			x = x / 95.047 <= 0.008856 ? x = 95.047 * (a / 500 + y2 - 16 / 116) / 7.787 : 95.047 * Math.pow(a / 500 + y2, 3);
			z = z / 108.883 <= 0.008859 ? z = 108.883 * (y2 - b / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(y2 - b / 200, 3);

			return [x, y, z];
		};

		convert.lab.lch = function (lab) {
			var l = lab[0];
			var a = lab[1];
			var b = lab[2];
			var hr;
			var h;
			var c;

			hr = Math.atan2(b, a);
			h = hr * 360 / 2 / Math.PI;

			if (h < 0) {
				h += 360;
			}

			c = Math.sqrt(a * a + b * b);

			return [l, c, h];
		};

		convert.lch.lab = function (lch) {
			var l = lch[0];
			var c = lch[1];
			var h = lch[2];
			var a;
			var b;
			var hr;

			hr = h / 360 * 2 * Math.PI;
			a = c * Math.cos(hr);
			b = c * Math.sin(hr);

			return [l, a, b];
		};

		convert.rgb.ansi16 = function (args) {
			var r = args[0];
			var g = args[1];
			var b = args[2];
			var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

			value = Math.round(value / 50);

			if (value === 0) {
				return 30;
			}

			var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

			if (value === 2) {
				ansi += 60;
			}

			return ansi;
		};

		convert.hsv.ansi16 = function (args) {
			// optimization here; we already know the value and don't need to get
			// it converted for us.
			return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
		};

		convert.rgb.ansi256 = function (args) {
			var r = args[0];
			var g = args[1];
			var b = args[2];

			// we use the extended greyscale palette here, with the exception of
			// black and white. normal palette only has 4 greyscale shades.
			if (r === g && g === b) {
				if (r < 8) {
					return 16;
				}

				if (r > 248) {
					return 231;
				}

				return Math.round((r - 8) / 247 * 24) + 232;
			}

			var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);

			return ansi;
		};

		convert.ansi16.rgb = function (args) {
			var color = args % 10;

			// handle greyscale
			if (color === 0 || color === 7) {
				if (args > 50) {
					color += 3.5;
				}

				color = color / 10.5 * 255;

				return [color, color, color];
			}

			var mult = (~ ~(args > 50) + 1) * 0.5;
			var r = (color & 1) * mult * 255;
			var g = (color >> 1 & 1) * mult * 255;
			var b = (color >> 2 & 1) * mult * 255;

			return [r, g, b];
		};

		convert.ansi256.rgb = function (args) {
			// handle greyscale
			if (args >= 232) {
				var c = (args - 232) * 10 + 8;
				return [c, c, c];
			}

			args -= 16;

			var rem;
			var r = Math.floor(args / 36) / 5 * 255;
			var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
			var b = rem % 6 / 5 * 255;

			return [r, g, b];
		};

		convert.rgb.hex = function (args) {
			var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);

			var string = integer.toString(16).toUpperCase();
			return '000000'.substring(string.length) + string;
		};

		convert.hex.rgb = function (args) {
			var match = args.toString(16).match(/[a-f0-9]{6}/i);
			if (!match) {
				return [0, 0, 0];
			}

			var integer = parseInt(match[0], 16);
			var r = integer >> 16 & 0xFF;
			var g = integer >> 8 & 0xFF;
			var b = integer & 0xFF;

			return [r, g, b];
		};

		convert.rgb.hcg = function (rgb) {
			var r = rgb[0] / 255;
			var g = rgb[1] / 255;
			var b = rgb[2] / 255;
			var max = Math.max(Math.max(r, g), b);
			var min = Math.min(Math.min(r, g), b);
			var chroma = max - min;
			var grayscale;
			var hue;

			if (chroma < 1) {
				grayscale = min / (1 - chroma);
			} else {
				grayscale = 0;
			}

			if (chroma <= 0) {
				hue = 0;
			} else if (max === r) {
				hue = (g - b) / chroma % 6;
			} else if (max === g) {
				hue = 2 + (b - r) / chroma;
			} else {
				hue = 4 + (r - g) / chroma + 4;
			}

			hue /= 6;
			hue %= 1;

			return [hue * 360, chroma * 100, grayscale * 100];
		};

		convert.hsl.hcg = function (hsl) {
			var s = hsl[1] / 100;
			var l = hsl[2] / 100;
			var c = 1;
			var f = 0;

			if (l < 0.5) {
				c = 2.0 * s * l;
			} else {
				c = 2.0 * s * (1.0 - l);
			}

			if (c < 1.0) {
				f = (l - 0.5 * c) / (1.0 - c);
			}

			return [hsl[0], c * 100, f * 100];
		};

		convert.hsv.hcg = function (hsv) {
			var s = hsv[1] / 100;
			var v = hsv[2] / 100;

			var c = s * v;
			var f = 0;

			if (c < 1.0) {
				f = (v - c) / (1 - c);
			}

			return [hsv[0], c * 100, f * 100];
		};

		convert.hcg.rgb = function (hcg) {
			var h = hcg[0] / 360;
			var c = hcg[1] / 100;
			var g = hcg[2] / 100;

			if (c === 0.0) {
				return [g * 255, g * 255, g * 255];
			}

			var pure = [0, 0, 0];
			var hi = h % 1 * 6;
			var v = hi % 1;
			var w = 1 - v;
			var mg = 0;

			switch (Math.floor(hi)) {
				case 0:
					pure[0] = 1;pure[1] = v;pure[2] = 0;break;
				case 1:
					pure[0] = w;pure[1] = 1;pure[2] = 0;break;
				case 2:
					pure[0] = 0;pure[1] = 1;pure[2] = v;break;
				case 3:
					pure[0] = 0;pure[1] = w;pure[2] = 1;break;
				case 4:
					pure[0] = v;pure[1] = 0;pure[2] = 1;break;
				default:
					pure[0] = 1;pure[1] = 0;pure[2] = w;
			}

			mg = (1.0 - c) * g;

			return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
		};

		convert.hcg.hsv = function (hcg) {
			var c = hcg[1] / 100;
			var g = hcg[2] / 100;

			var v = c + g * (1.0 - c);
			var f = 0;

			if (v > 0.0) {
				f = c / v;
			}

			return [hcg[0], f * 100, v * 100];
		};

		convert.hcg.hsl = function (hcg) {
			var c = hcg[1] / 100;
			var g = hcg[2] / 100;

			var l = g * (1.0 - c) + 0.5 * c;
			var s = 0;

			if (l > 0.0 && l < 0.5) {
				s = c / (2 * l);
			} else if (l >= 0.5 && l < 1.0) {
				s = c / (2 * (1 - l));
			}

			return [hcg[0], s * 100, l * 100];
		};

		convert.hcg.hwb = function (hcg) {
			var c = hcg[1] / 100;
			var g = hcg[2] / 100;
			var v = c + g * (1.0 - c);
			return [hcg[0], (v - c) * 100, (1 - v) * 100];
		};

		convert.hwb.hcg = function (hwb) {
			var w = hwb[1] / 100;
			var b = hwb[2] / 100;
			var v = 1 - b;
			var c = v - w;
			var g = 0;

			if (c < 1) {
				g = (v - c) / (1 - c);
			}

			return [hwb[0], c * 100, g * 100];
		};

		convert.apple.rgb = function (apple) {
			return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
		};

		convert.rgb.apple = function (rgb) {
			return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
		};
	});

	var require$$0$1 = conversions && (typeof conversions === 'undefined' ? 'undefined' : babelHelpers.typeof(conversions)) === 'object' && 'default' in conversions ? conversions['default'] : conversions;

	var route = __commonjs(function (module) {
		var conversions = require$$0$1;

		/*
	 	this function routes a model to all other models.
	 
	 	all functions that are routed have a property `.conversion` attached
	 	to the returned synthetic function. This property is an array
	 	of strings, each with the steps in between the 'from' and 'to'
	 	color models (inclusive).
	 
	 	conversions that are not possible simply are not included.
	 */

		// https://jsperf.com/object-keys-vs-for-in-with-closure/3
		var models = Object.keys(conversions);

		function buildGraph() {
			var graph = {};

			for (var len = models.length, i = 0; i < len; i++) {
				graph[models[i]] = {
					// http://jsperf.com/1-vs-infinity
					// micro-opt, but this is simple.
					distance: -1,
					parent: null
				};
			}

			return graph;
		}

		// https://en.wikipedia.org/wiki/Breadth-first_search
		function deriveBFS(fromModel) {
			var graph = buildGraph();
			var queue = [fromModel]; // unshift -> queue -> pop

			graph[fromModel].distance = 0;

			while (queue.length) {
				var current = queue.pop();
				var adjacents = Object.keys(conversions[current]);

				for (var len = adjacents.length, i = 0; i < len; i++) {
					var adjacent = adjacents[i];
					var node = graph[adjacent];

					if (node.distance === -1) {
						node.distance = graph[current].distance + 1;
						node.parent = current;
						queue.unshift(adjacent);
					}
				}
			}

			return graph;
		}

		function link(from, to) {
			return function (args) {
				return to(from(args));
			};
		}

		function wrapConversion(toModel, graph) {
			var path = [graph[toModel].parent, toModel];
			var fn = conversions[graph[toModel].parent][toModel];

			var cur = graph[toModel].parent;
			while (graph[cur].parent) {
				path.unshift(graph[cur].parent);
				fn = link(conversions[graph[cur].parent][cur], fn);
				cur = graph[cur].parent;
			}

			fn.conversion = path;
			return fn;
		}

		module.exports = function (fromModel) {
			var graph = deriveBFS(fromModel);
			var conversion = {};

			var models = Object.keys(graph);
			for (var len = models.length, i = 0; i < len; i++) {
				var toModel = models[i];
				var node = graph[toModel];

				if (node.parent === null) {
					// no possible conversion, or this node is the source model.
					continue;
				}

				conversion[toModel] = wrapConversion(toModel, graph);
			}

			return conversion;
		};
	});

	var require$$0 = route && (typeof route === 'undefined' ? 'undefined' : babelHelpers.typeof(route)) === 'object' && 'default' in route ? route['default'] : route;

	var index = __commonjs(function (module) {
		var conversions = require$$0$1;
		var route = require$$0;

		var convert = {};

		var models = Object.keys(conversions);

		function wrapRaw(fn) {
			var wrappedFn = function wrappedFn(args) {
				if (args === undefined || args === null) {
					return args;
				}

				if (arguments.length > 1) {
					args = Array.prototype.slice.call(arguments);
				}

				return fn(args);
			};

			// preserve .conversion property if there is one
			if ('conversion' in fn) {
				wrappedFn.conversion = fn.conversion;
			}

			return wrappedFn;
		}

		function wrapRounded(fn) {
			var wrappedFn = function wrappedFn(args) {
				if (args === undefined || args === null) {
					return args;
				}

				if (arguments.length > 1) {
					args = Array.prototype.slice.call(arguments);
				}

				var result = fn(args);

				// we're assuming the result is an array here.
				// see notice in conversions.js; don't use box types
				// in conversion functions.
				if ((typeof result === 'undefined' ? 'undefined' : babelHelpers.typeof(result)) === 'object') {
					for (var len = result.length, i = 0; i < len; i++) {
						result[i] = Math.round(result[i]);
					}
				}

				return result;
			};

			// preserve .conversion property if there is one
			if ('conversion' in fn) {
				wrappedFn.conversion = fn.conversion;
			}

			return wrappedFn;
		}

		models.forEach(function (fromModel) {
			convert[fromModel] = {};

			Object.defineProperty(convert[fromModel], 'channels', { value: conversions[fromModel].channels });

			var routes = route(fromModel);
			var routeModels = Object.keys(routes);

			routeModels.forEach(function (toModel) {
				var fn = routes[toModel];

				convert[fromModel][toModel] = wrapRounded(fn);
				convert[fromModel][toModel].raw = wrapRaw(fn);
			});
		});

		module.exports = convert;
	});

	var convert = index && (typeof index === 'undefined' ? 'undefined' : babelHelpers.typeof(index)) === 'object' && 'default' in index ? index['default'] : index;

	var HEX_SHORT = /^#([a-fA-F0-9]{3})$/;
	var HEX = /^#([a-fA-F0-9]{6})$/;

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
	    key: "parseHex",
	    value: function parseHex(hex) {
	      var normalizedHex = this.normalizeHex(hex);

	      if (normalizedHex === null) {
	        return null;
	      }

	      var _convert$hex$rgb = convert.hex.rgb(normalizedHex);

	      var _convert$hex$rgb2 = babelHelpers.slicedToArray(_convert$hex$rgb, 3);

	      var r = _convert$hex$rgb2[0];
	      var g = _convert$hex$rgb2[1];
	      var b = _convert$hex$rgb2[2];

	      return { r: r, g: g, b: b };
	    }
	  }, {
	    key: "rgbToHsv",
	    value: function rgbToHsv(rgb) {
	      var _convert$rgb$hsv = convert.rgb.hsv([rgb.r, rgb.g, rgb.b]);

	      var _convert$rgb$hsv2 = babelHelpers.slicedToArray(_convert$rgb$hsv, 3);

	      var h = _convert$rgb$hsv2[0];
	      var s = _convert$rgb$hsv2[1];
	      var v = _convert$rgb$hsv2[2];

	      return { h: h, s: s, v: v };
	    }
	  }]);

	  function Color(hex) {
	    babelHelpers.classCallCheck(this, Color);

	    this.original = hex;
	    this.hex = Color.normalizeHex(hex);
	    this.rgb = Color.parseHex(this.hex);
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
	      var a = convert.hex.lab(color1.hex);
	      var b = convert.hex.lab(color2.hex);

	      var _a = babelHelpers.slicedToArray(a, 3);

	      var l1 = _a[0];
	      var a1 = _a[1];
	      var b1 = _a[2];

	      var _b = babelHelpers.slicedToArray(b, 3);

	      var l2 = _b[0];
	      var a2 = _b[1];
	      var b2 = _b[2];


	      return ColorDiff._ciede2000(l1, a1, b1, l2, a2, b2);
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
	      var b = color1.hsv;
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
	var W3C = ["#000000", "#C0C0C0", "#808080", "#FFFFFF", "#800000", "#FF0000", "#800080", "#FF00FF", "#008000", "#00FF00", "#808000", "#FFFF00", "#000080", "#0000FF", "#008080", "#00FFFF"];

	var PCCS = [
	// Vivid-tone
	"#b5184f", "#cd1f42", "#dd3737", "#e55125", "#e66d00", "#f29500", "#eeac00", "#e2c500", "#c8bb00", "#a4b300", "#4aa315", "#009a55", "#008c69", "#007e77", "#007c8c", "#006b93", "#005a91", "#00569c", "#00509d", "#474798", "#663e8c", "#793580", "#892c71", "#ab2664",

	// Mono-tone
	"#efefef", "#d2d2d2", "#b6b6b6", "#9b9b9b", "#818181", "#696969", "#525252", "#3c3c3c", "#292929"];



	var Palette = Object.freeze({
		W3C: W3C,
		PCCS: PCCS
	});

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
	    value: function classify(hex) {
	      var palette = this.palette;
	      var algorithmType = this.algorithmType;

	      var color = new Color(hex);
	      var array = [];

	      palette.forEach(function (paletteColor) {
	        array.push({
	          distance: ColorDiff.diff(algorithmType, paletteColor, color),
	          color: paletteColor.original
	        });
	      });

	      return minBy(array, "distance").color;
	    }
	  }, {
	    key: "classifyFromArray",
	    value: function classifyFromArray(hexArray) {
	      var _this = this;

	      var results = {};

	      hexArray.forEach(function (hex) {
	        var resultColor = _this.classify(hex);

	        if (!results.hasOwnProperty(resultColor)) {
	          results[resultColor] = [];
	        }

	        results[resultColor].push(hex);
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