"use strict";

import assert from "power-assert"
import Color, { AlgorithmTypes } from "../src/utils/color"


function ciede2kEqual(expected, l1, a1, b1, l2, a2, b2) {
  assert(expected === Math.round(Color._ciede2kDistance(l1, a1, b1, l2, a2, b2) * 10000) / 10000, `{L:${l1}, a:${a1}, b:${b1}}, {L:${l2}, a:${a2}, b:${b2}} == ${expected}`);
}


describe("Color", () => {

  describe("parseRgb()", () => {
    it("should be parsed", () => {
      assert.deepStrictEqual(Color.parseHex("#ffffff"), {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.parseHex("#993dba"), {r: 153, g: 61,  b: 186});
      assert.deepStrictEqual(Color.parseHex("#52d034"), {r: 82,  g: 208, b: 52});
      assert.deepStrictEqual(Color.parseHex("#000000"), {r: 0,   g: 0,   b: 0});
      assert.deepStrictEqual(Color.parseHex("#fff"),    {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.parseHex("#f00"),    {r: 255, g: 0,   b: 0}) ;
      assert.deepStrictEqual(Color.parseHex("#45f"),    {r: 68,  g: 85,  b: 255});
      assert.deepStrictEqual(Color.parseHex("#000"),    {r: 0,   g: 0,   b: 0});
    });

    it("should be not parsed", () => {
      assert(Color.parseHex("000") === null);
      assert(Color.parseHex("#ff") === null);
      assert(Color.parseHex("#00tdfc") === null);
      assert(Color.parseHex("") === null);
      assert(Color.parseHex(null) === null);
      assert(Color.parseHex(undefined) === null);
      assert(Color.parseHex(undefined) === null);
    });
  });

  describe("rgbToHsv()", () => {
    it("should be converted", () => {
      assert.deepStrictEqual(Color.rgbToHsv({r: 255, g: 255, b: 255}), {h: 0,   s: 0,  v: 100});
      assert.deepStrictEqual(Color.rgbToHsv({r: 0,   g: 0,   b: 0}),   {h: 0,   s: 0,  v: 0});
      assert.deepStrictEqual(Color.rgbToHsv({r: 8,   g: 172, b: 114}), {h: 159, s: 95, v: 67});
      assert.deepStrictEqual(Color.rgbToHsv({r: 102, g: 163, b: 30}),  {h: 88,  s: 82, v: 64});
      assert.deepStrictEqual(Color.rgbToHsv({r: 32,  g: 11,  b: 67}),  {h: 263, s: 84, v: 26});
    });
  });

  // http://www.ece.rochester.edu/~gsharma/ciede2000/
  describe("_ciede2kDistance()", () => {
    it("should be return the ciede2000 color difference", () => {
      ciede2kEqual(2.0425 , 50.0000, 2.6772  , -79.7751, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(2.8615 , 50.0000, 3.1571  , -77.2803, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(3.4412 , 50.0000, 2.8361  , -74.0200, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(1.0000 , 50.0000, -1.3802 , -84.2814, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(1.0000 , 50.0000, -1.1848 , -84.8006, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(1.0000 , 50.0000, -0.9009 , -85.5211, 50.0000, 0.0000  , -82.7485)
      ciede2kEqual(2.3669 , 50.0000, 0.0000  , 0.0000  , 50.0000, -1.0000 , 2.0000)
      ciede2kEqual(2.3669 , 50.0000, -1.0000 , 2.0000  , 50.0000, 0.0000  , 0.0000)
      ciede2kEqual(7.1792 , 50.0000, 2.4900  , -0.0010 , 50.0000, -2.4900 , 0.0009)
      ciede2kEqual(7.1792 , 50.0000, 2.4900  , -0.0010 , 50.0000, -2.4900 , 0.0010)
      ciede2kEqual(7.2195 , 50.0000, 2.4900  , -0.0010 , 50.0000, -2.4900 , 0.0011)
      ciede2kEqual(7.2195 , 50.0000, 2.4900  , -0.0010 , 50.0000, -2.4900 , 0.0012)
      ciede2kEqual(4.8045 , 50.0000, -0.0010 , 2.4900  , 50.0000, 0.0009  , -2.4900)
      ciede2kEqual(4.8045 , 50.0000, -0.0010 , 2.4900  , 50.0000, 0.0010  , -2.4900)
      ciede2kEqual(4.7461 , 50.0000, -0.0010 , 2.4900  , 50.0000, 0.0011  , -2.4900)
      ciede2kEqual(4.3065 , 50.0000, 2.5000  , 0.0000  , 50.0000, 0.0000  , -2.5000)
      ciede2kEqual(27.1492, 50.0000, 2.5000  , 0.0000  , 73.0000, 25.0000 , -18.0000)
      ciede2kEqual(22.8977, 50.0000, 2.5000  , 0.0000  , 61.0000, -5.0000 , 29.0000)
      ciede2kEqual(31.9030, 50.0000, 2.5000  , 0.0000  , 56.0000, -27.0000, -3.0000)
      ciede2kEqual(19.4535, 50.0000, 2.5000  , 0.0000  , 58.0000, 24.0000 , 15.0000)
      ciede2kEqual(1.0000 , 50.0000, 2.5000  , 0.0000  , 50.0000, 3.1736  , 0.5854)
      ciede2kEqual(1.0000 , 50.0000, 2.5000  , 0.0000  , 50.0000, 3.2972  , 0.0000)
      ciede2kEqual(1.0000 , 50.0000, 2.5000  , 0.0000  , 50.0000, 1.8634  , 0.5757)
      ciede2kEqual(1.0000 , 50.0000, 2.5000  , 0.0000  , 50.0000, 3.2592  , 0.3350)
      ciede2kEqual(1.2644 , 60.2574, -34.0099, 36.2677 , 60.4626, -34.1751, 39.4387)
      ciede2kEqual(1.2630 , 63.0109, -31.0961, -5.8663 , 62.8187, -29.7946, -4.0864)
      ciede2kEqual(1.8731 , 61.2901, 3.7196  , -5.3901 , 61.4292, 2.2480  , -4.9620)
      ciede2kEqual(1.8645 , 35.0831, -44.1164, 3.7933  , 35.0232, -40.0716, 1.5901)
      ciede2kEqual(2.0373 , 22.7233, 20.0904 , -46.6940, 23.0331, 14.9730 , -42.5619)
      ciede2kEqual(1.4146 , 36.4612, 47.8580 , 18.3852 , 36.2715, 50.5065 , 21.2231)
      ciede2kEqual(1.4441 , 90.8027, -2.0831 , 1.4410  , 91.1528, -1.6435 , 0.0447)
      ciede2kEqual(1.5381 , 90.9257, -0.5406 , -0.9208 , 88.6381, -0.8985 , -0.7239)
      ciede2kEqual(0.6377 , 6.7747 , -0.2908 , -2.4247 , 5.8714 , -0.0985 , -2.2286)
      ciede2kEqual(0.9082 , 2.0776 , 0.0795  , -1.1350 , 0.9033 , -0.0636 , -0.5514)
    });
  });
});
