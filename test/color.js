"use strict";

import assert from "power-assert"
import Color from "../src/utils/color"


describe("Color", () => {

  describe("hexToRgb()", () => {
    it("should be parsed", () => {
      assert.deepStrictEqual(Color.hexToRgb("#ffffff"), {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.hexToRgb("#993dba"), {r: 153, g: 61,  b: 186});
      assert.deepStrictEqual(Color.hexToRgb("#52d034"), {r: 82,  g: 208, b: 52});
      assert.deepStrictEqual(Color.hexToRgb("#000000"), {r: 0,   g: 0,   b: 0});
      assert.deepStrictEqual(Color.hexToRgb("#fff"),    {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.hexToRgb("#f00"),    {r: 255, g: 0,   b: 0}) ;
      assert.deepStrictEqual(Color.hexToRgb("#45f"),    {r: 68,  g: 85,  b: 255});
      assert.deepStrictEqual(Color.hexToRgb("#000"),    {r: 0,   g: 0,   b: 0});
    });

    it("should be not parsed", () => {
      assert(Color.hexToRgb("000") === null);
      assert(Color.hexToRgb("#ff") === null);
      assert(Color.hexToRgb("#00tdfc") === null);
      assert(Color.hexToRgb("") === null);
      assert(Color.hexToRgb(null) === null);
      assert(Color.hexToRgb(undefined) === null);
      assert(Color.hexToRgb(undefined) === null);
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
});
