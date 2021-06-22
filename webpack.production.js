/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");

const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");

const base = require("./webpack.config");

module.exports = merge(base, {
  mode: "production",
  devtool: false,
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/src/index.html"),
      filename: "index.html",
      base: "app://rse",
    }),
    // You can paste your CSP in this website https://csp-evaluator.withgoogle.com/
    // for it to give you suggestions on how strong your CSP is
    new CspHtmlWebpackPlugin(
      {
        "base-uri": ["'self'"],
        "object-src": ["'none'"],
        "script-src": ["'self'"],
        // unsafe-inline required for styled-components, but it is definitely unsafe
        "style-src": ["'self'", "'unsafe-inline'"],
        "frame-src": ["'none'"],
        "worker-src": ["'none'"],
      },
      {
        hashEnabled: {
          "style-src": false,
        },
      }
    ),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      "...", // This adds default minimizers to webpack. For JS, Terser is used. // https://webpack.js.org/configuration/optimization/#optimizationminimizer
      new CssMinimizerPlugin(),
    ],
  },
});
