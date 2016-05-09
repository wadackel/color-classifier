"use strict";

import assert from "power-assert"
import Color from "../src/utils/color"
import ColorClassifier from "../src/color-classifier"


describe("Color", () => {

  describe("parseRgb()", () => {
    it("should be parsed", () => {
      assert.deepStrictEqual(Color.parseRgb("#ffffff"), {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.parseRgb("#993dba"), {r: 153, g: 61, b: 186});
      assert.deepStrictEqual(Color.parseRgb("#52d034"), {r: 82, g: 208, b: 52});
      assert.deepStrictEqual(Color.parseRgb("#000000"), {r: 0, g: 0, b: 0});
      assert.deepStrictEqual(Color.parseRgb("#fff"), {r: 255, g: 255, b: 255});
      assert.deepStrictEqual(Color.parseRgb("#f00"), {r: 255, g: 0, b: 0});
      assert.deepStrictEqual(Color.parseRgb("#45f"), {r: 68, g: 85, b: 255});
      assert.deepStrictEqual(Color.parseRgb("#000"), {r: 0, g: 0, b: 0});
    });

    it("should be not parsed", () => {
      assert(Color.parseRgb("000") === null);
      assert(Color.parseRgb("#ff") === null);
      assert(Color.parseRgb("#00tdfc") === null);
      assert(Color.parseRgb("") === null);
      assert(Color.parseRgb(null) === null);
      assert(Color.parseRgb(undefined) === null);
      assert(Color.parseRgb(undefined) === null);
    });
  });
});


describe("ColorClassify", () => {

  describe("__TODO__", () => {
    it("__todo__", () => {
      // assert(1 === 2);
      assert(1 === 1);
    });
  });
});
