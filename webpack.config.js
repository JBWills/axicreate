const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  target: "web", // Our app can run without electron
  entry: ["./app/src/index.tsx"], // The entry point of our app; these entry points can be named and we can also have multiple if we'd like to split the webpack bundle into smaller files to improve script loading speed between multiple pages of our app
  output: {
    path: path.resolve(__dirname, "app/dist"), // Where all the output files get dropped after webpack is done with them
    filename: "bundle.js", // The name of the webpack bundle that's generated
  },
  resolve: {
    modules: [path.resolve(__dirname, "app/src"), "node_modules"],
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      buffer: require.resolve("buffer/"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  module: {
    rules: [
      {
        // loads .html files
        test: /\.(html)$/,
        include: [path.resolve(__dirname, "app/src")],
        use: {
          loader: "html-loader",
          options: {
            sources: {
              list: [
                {
                  tag: "img",
                  attribute: "data-src",
                  type: "src",
                },
              ],
            },
          },
        },
      },
      {
        test: /(\.tsx|\.jsx|\.ts|\.js)$/,
        loader: "babel-loader",
        include: [path.resolve(__dirname, "app/src")],
        resolve: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      // loads .css files
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/src"),
          path.resolve(__dirname, "node_modules/"),
        ],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        resolve: {
          extensions: [".css"],
        },
      },
      // loads common image formats
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: "url-loader",
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error;
    // https://stackoverflow.com/a/64553486/1837080
    new webpack.ProvidePlugin({ process: "process/browser.js" }),
    new webpack.ProvidePlugin({ React: "react" }),
    new CleanWebpackPlugin(),
  ],
};
