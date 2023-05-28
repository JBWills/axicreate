import type { Configuration } from "webpack"

import { rules } from "./webpack.rules"

const path = require("path")

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/electron/index.ts",
  // Put your normal webpack config below here
  module: {
    rules,
  },
  target: "electron-renderer",
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    modules: [path.resolve("./node_modules"), path.resolve(".")],
    fallback: {
      util: require.resolve("util/"),
      assert: require.resolve("assert/"),
    },
  },
  plugins: [],
}
