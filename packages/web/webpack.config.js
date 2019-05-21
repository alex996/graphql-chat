/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.DefinePlugin({
      API_URI: `"${process.env.API_URI || '/graphql'}"`
    })
  ],
  devServer: {
    open: true,
    port: 4000,
    compress: true,
    historyApiFallback: true, // HTML5 History
    proxy: {
      '/graphql': 'http://localhost:3000'
    }
  }
}
