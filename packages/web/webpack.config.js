/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = (env, { mode }) => {
  const inDev = mode === 'development'

  return {
    devtool: inDev ? 'cheap-module-eval-source-map' : 'source-map',
    output: {
      filename: inDev ? '[name].js' : '[name].[contenthash].js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@material-ui/core': '@material-ui/core/es'
      }
    },
    module: {
      rules: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      new webpack.DefinePlugin({
        'process.env.API_URI': `"${process.env.API_URI || '/graphql'}"`
      })
    ],
    devServer: {
      open: true,
      port: 4000,
      compress: true,
      historyApiFallback: true,
      proxy: {
        '/graphql': 'http://localhost:3000'
      }
    }
  }
}
