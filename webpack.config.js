const path = require("path");
const SRC = path.join(__dirname, "/client/src");
const DIS = path.join(__dirname, "/client/dist");

module.exports = {
  mode: "development",
  entry: `${SRC}/app.tsx`,
  output: {
    filename: "bundle.js",
    path: DIS,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
    ],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  devtool: "source-map",
};
