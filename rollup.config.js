"use strict";

import nodeResolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import uglify from "rollup-plugin-uglify"

const pkg = require("./package.json");
const banner = `
/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @version ${pkg.version}
 */
`;

export default {
  banner,
  moduleName: "ColorClassifier",
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
}
