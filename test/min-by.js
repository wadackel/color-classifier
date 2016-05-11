"use strict";

import assert from "power-assert"
import minBy from "../src/utils/min-by"


describe("minBy", () => {

  it("should be return the min value", () => {
    assert(minBy() === "");
  });
});
