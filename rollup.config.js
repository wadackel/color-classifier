"use strict";

import nodeResolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"

export default {
  entry: "src/color-classify.js",
  dest: "color-classify.js",
  moduleName: "ColorClassify",
  format: "umd",
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: "node_modules/**"
    }),
    babel()
  ]
};
