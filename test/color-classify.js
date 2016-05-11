"use strict";

import assert from "power-assert"
import isPlainObject from "is-plain-object"
import ColorClassifier from "../src/color-classifier"


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
  });

  describe("classifyFromArray()", () => {
    it("should be return the object in hex string", () => {
      const c = new ColorClassifier();
      assert(isPlainObject(c.classifyFromArray(["#fff", "#eee"])) === true);
      assert(isPlainObject(c.classifyFromArray(["#4c2e79", "#59792e"])) === true);
      assert(isPlainObject(c.classifyFromArray(["#140dc7"])) === true);
      assert(isPlainObject(c.classifyFromArray(["#000", "#ff0"])) === true);
      assert(isPlainObject(c.classifyFromArray(["#000000", "#808080", "#c0c0c0", "#ffffff", "#0000ff", "#000080", "#008080", "#008000", "#00ff00", "#00ffff", "#ffff00", "#ff0000", "#ff00ff", "#808000", "#800080", "#800000"])) === true);
    });
  });
});
