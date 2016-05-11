"use strict";

import assert from "power-assert"
import minBy from "../src/utils/min-by"


const makeTestArray = array => {
  return array.map(value => ({n: value}));
};


describe("minBy", () => {

  it("should be return the min value", () => {
    assert.deepStrictEqual(minBy(makeTestArray([0, 1, 2, 3, 4, 5]), "n"), {n: 0});
    assert.deepStrictEqual(minBy(makeTestArray([-5, -4, -3, -2, -1, 0]), "n"), {n: -5});
    assert.deepStrictEqual(minBy(makeTestArray([500.85, 30.12, 32.05, 400.23]), "n"), {n: 30.12});
  });
});
