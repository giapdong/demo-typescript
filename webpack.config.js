const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  entry: {
    server: [path.join(__dirname, "src", "app.ts")]
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
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
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
