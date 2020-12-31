const path = require("path");

module.exports = {
  context: __dirname,
  node: {
    __dirname: true
  },
  mode: "development",
  entry: {
    index: [path.join(__dirname, "abcd.js")]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/dist"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": __dirname
    }
  },
  plugins: [],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};
