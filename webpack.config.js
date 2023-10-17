const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",  
  output: {
    path: path.resolve(__dirname, "dist"),  
    filename: "bundle.js",  
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",  
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS into separate files
          'css-loader',                // Translates CSS into CommonJS
          'sass-loader'                // Compiles SCSS to CSS
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images", 
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",  
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",  
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/images", to: "images" }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 8080, // Port for the dev server
  },
  resolve: {
    fallback: {
      // Provide access to the DOM and document object
      util: require.resolve("util/"),
      fs: false,
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
