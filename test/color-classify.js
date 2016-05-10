"use strict";

import assert from "power-assert"
import Color from "../src/utils/color"
import ColorClassifier from "../src/color-classifier"


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
});


describe("ColorClassify", () => {

  describe("classify()", () => {
    it("should be return the single hex string", () => {
      const c = new ColorClassifier();
      assert(typeof c.classify("#fff") === "string");
      assert(typeof c.classify("#888") === "string");
      assert(typeof c.classify("#5c3cd4") === "string");
      assert(typeof c.classify("#7f437a") === "string");
      assert(typeof c.classify("#afe713") === "string");
      assert(typeof c.classify("#139ce7") === "string");
    });

    it("should be return the array in hex string", () => {
      const c = new ColorClassifier();
      assert(Array.isArray(c.classify(["#fff", "#eee"])) === true);
      assert(Array.isArray(c.classify(["#4c2e79", "#59792e"])) === true);
      assert(Array.isArray(c.classify(["#140dc7"])) === true);
      assert(Array.isArray(c.classify(["#000", "#ff0"])) === true);
      assert(Array.isArray(c.classify(["#000000", "#808080", "#c0c0c0", "#ffffff", "#0000ff", "#000080", "#008080", "#008000", "#00ff00", "#00ffff", "#ffff00", "#ff0000", "#ff00ff", "#808000", "#800080", "#800000"])) === true);
    });
  });
});
