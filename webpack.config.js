const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // Use Babel for JavaScript
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // Translates CSS into CommonJS
          'sass-loader', // Compiles Sass to CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html', // Your HTML template
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/style.scss', // Extracted CSS filename
    }),
  ],
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
      },
    port: 8080, // Port for the dev server
  },
  resolve: {
    fallback: {
      // Provide access to the DOM and document object
      "util": require.resolve("util/"),
      "fs": false,
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
    },
  },
};

