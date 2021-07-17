const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'src/public/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      // CSS, PostCSS, Sass
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },

  plugins: [new CleanWebpackPlugin()]
}
