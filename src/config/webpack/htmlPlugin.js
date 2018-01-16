const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = config => (context, { merge }) =>
  merge({ plugins: [new HTMLWebpackPlugin(config)] })
