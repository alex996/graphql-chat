const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')

const shared = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

module.exports = [
  {
    ...shared,
    entry: './src/client.js'
  },
  {
    ...shared,
    target: 'node',
    entry: './src/server.js',
    output: {
      path: `${__dirname}/dist-server`
    },
    externals: [nodeExternals()],
    plugins: [new NodemonPlugin()]
  }
]
