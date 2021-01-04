const path = require("path");
console.log("Build at: ", __dirname);
module.exports = {
  mode: "production",
  entry: path.join(__dirname, "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
