"use strict";

import assert from "power-assert"
import isPlainObject from "is-plain-object"
import ColorClassifier from "../src/color-classifier"
import Color from "../src/utils/color"

const { Palette, AlgorithmTypes } = ColorClassifier;


describe("ColorClassify", () => {

  describe("setter/getter", () => {
    it("should be set and get", () => {
      const c = new ColorClassifier();

      c.setPalette(["#fff", "#000"]);
      assert.deepStrictEqual(c.getPalette(), [
        new Color("#fff"),
        new Color("#000")
      ]);

      c.setAlgorithmType(AlgorithmTypes.HSV);
      assert(c.getAlgorithmType() === AlgorithmTypes.HSV);
    });

    it("should be throws error", () => {
      const c = new ColorClassifier();

      assert.throws(() => { c.setPalette(null); }, Error);
      assert.throws(() => { c.setPalette(undefined); }, Error);
      assert.throws(() => { c.setPalette(""); }, Error);
      assert.throws(() => { c.setPalette(0); }, Error);
      assert.throws(() => { c.setPalette({}); }, Error);

      assert.throws(() => { c.setAlgorithmType(null); }, Error);
      assert.throws(() => { c.setAlgorithmType(undefined); }, Error);
      assert.throws(() => { c.setAlgorithmType(""); }, Error);
      assert.throws(() => { c.setAlgorithmType(0); }, Error);
      assert.throws(() => { c.setAlgorithmType({}); }, Error);
      assert.throws(() => { c.setAlgorithmType([]); }, Error);
    });
  });

  describe("classify()", () => {
    it("should be return the single hex string", () => {
      const c = new ColorClassifier();
      assert(isPlainObject(c.classify("#fff"))    === true);
      assert(isPlainObject(c.classify("#888"))    === true);
      assert(isPlainObject(c.classify("#5c3cd4")) === true);
      assert(isPlainObject(c.classify("#7f437a")) === true);
      assert(isPlainObject(c.classify("#afe713")) === true);
      assert(isPlainObject(c.classify("#139ce7")) === true);

      assert(isPlainObject(c.classify("#fff", "hsv"))    === true);
      assert(isPlainObject(c.classify("#888", "hsv"))    === true);
      assert(isPlainObject(c.classify("#5c3cd4", "hsv")) === true);
      assert(isPlainObject(c.classify("#7f437a", "hsv")) === true);
      assert(isPlainObject(c.classify("#afe713", "hsv")) === true);
      assert(isPlainObject(c.classify("#139ce7", "hsv")) === true);

      assert(typeof c.classify("#fff", "hex")    === "string");
      assert(typeof c.classify("#888", "hex")    === "string");
      assert(typeof c.classify("#5c3cd4", "hex") === "string");
      assert(typeof c.classify("#7f437a", "hex") === "string");
      assert(typeof c.classify("#afe713", "hex") === "string");
      assert(typeof c.classify("#139ce7", "hex") === "string");
    });

    it("should be classify color", () => {
      const c = new ColorClassifier(["#ffffff", "#000000"]);

      assert(c.classify("#fafafa", "hex") === "#ffffff");
      assert(c.classify("#121212", "hex") === "#000000");

      c.setAlgorithmType(AlgorithmTypes.HSV);
      assert(c.classify("#fafafa"), "hex" === "#ffffff");
      assert(c.classify("#121212"), "hex" === "#ffffff");

      c.setAlgorithmType(AlgorithmTypes.RGB);
      assert(c.classify("#fafafa"), "hex" === "#ffffff");
      assert(c.classify("#121212"), "hex" === "#ffffff");
    });
  });

  describe("classifyFromArray()", () => {
    it("should be return the array in hex string", () => {
      const c = new ColorClassifier();
      assert(Array.isArray(c.classifyFromArray(["#fff", "#eee"])) === true);
      assert(Array.isArray(c.classifyFromArray(["#4c2e79", "#59792e"])) === true);
      assert(Array.isArray(c.classifyFromArray(["#140dc7"])) === true);
      assert(Array.isArray(c.classifyFromArray(["#000", "#ff0"])) === true);
      assert(Array.isArray(c.classifyFromArray(["#000000", "#808080", "#c0c0c0", "#ffffff", "#0000ff", "#000080", "#008080", "#008000", "#00ff00", "#00ffff", "#ffff00", "#ff0000", "#ff00ff", "#808000", "#800080", "#800000"])) === true);
    });

    it("should be classify colors", () => {
      const c = new ColorClassifier(["#ffffff", "#000000"]);

      assert.deepStrictEqual(c.classifyFromArray(["#fafafa", "#fefefe", "#121212", "#333333"], "hex"), [
        {
          palette: "#ffffff",
          colors: ["#fafafa", "#fefefe"]
        },
        {
          palette: "#000000",
          colors: ["#121212", "#333333"]
        }
      ]);

      c.setAlgorithmType(AlgorithmTypes.HSV);
      assert.deepStrictEqual(c.classifyFromArray(["#fafafa", "#fefefe", "#121212", "#333333"], "hex"), [
        {
          palette: "#ffffff",
          colors: ["#fafafa", "#fefefe"]
        },
        {
          palette: "#000000",
          colors: ["#121212", "#333333"]
        }
      ]);

      c.setAlgorithmType(AlgorithmTypes.RGB);
      assert.deepStrictEqual(c.classifyFromArray(["#fafafa", "#fefefe", "#121212", "#333333"], "hex"), [
        {
          palette: "#ffffff",
          colors: ["#fafafa", "#fefefe"]
        },
        {
          palette: "#000000",
          colors: ["#121212", "#333333"]
        }
      ]);
    });
  });
});
