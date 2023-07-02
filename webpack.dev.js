const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge([
  common,
  {
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
  }
  },
]);
