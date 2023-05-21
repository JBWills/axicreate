import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from "webpack"

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new webpack.ProvidePlugin({
    React: "react",
  }),
]
