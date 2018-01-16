const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = config => (context, { merge }) => merge({
  plugins: [new CleanWebpackPlugin(config)],
})
