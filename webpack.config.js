var path = require('path');
var config = {
  entry: path.resolve(__dirname, 'src/index.jsx'),
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
        loader: 'babel', // The module to load. "babel" is short for "babel-loader"
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
