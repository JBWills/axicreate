import path from "path"

import type { Configuration } from "webpack"

import { plugins } from "./webpack.plugins"
import { rules } from "./webpack.rules"

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "postcss-loader" }],
})

rules.push({
  test: /\.(png|jpg|gif|jpeg|icns)$/,
  use: [
    {
      loader: "file-loader",
      options: {},
    },
  ],
})

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    fallback: { crypto: false },
    modules: [path.resolve("./node_modules"), path.resolve(".")],
  },
}
