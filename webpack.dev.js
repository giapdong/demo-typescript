const path = require("path");

module.exports = {
  context: __dirname,
  node: {
    __dirname: true
  },
  mode: "development",
  entry: {
    index: [path.join(__dirname, "index.ts")]
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/build"
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
