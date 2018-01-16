/* @flow */

const { resolve } = require('path')

const {
  createConfig,
  env,

  entryPoint,
  setOutput,
  setContext,
  setDevTool,

  css,
  uglify,
  devServer,
} = require('webpack-blocks')

const babelPreset = require('./src/config/webpack/babelPreset')
const htmlPlugin = require('./src/config/webpack/htmlPlugin')
const clean = require('./src/config/webpack/clean')

const src = resolve(__dirname, 'src')
const front = resolve(src, 'front')

module.exports = createConfig([

  setContext(front),
  entryPoint({ main: './index.js' }),

  setOutput({
    path: resolve(__dirname, 'build'),
    filename: '[name].[hash].bundle.js',
  }),

  setDevTool('source-map'),

  css(),

  babelPreset({
    test: /\.js$/,
    exclude: [
      resolve(__dirname, 'node_modules'),
    ],
    query: {
      babelrc: false,
      plugins: [
        'ramda',
      ],
      presets: [
        '@babel/flow',
        ['@babel/env', {
          targets: {
            browsers: [
              'last 2 versions',
              'iOS > 8',
            ],
          },
          debug: false,
          modules: false,
        }],
        '@babel/react',
      ],
    },
  }),

  htmlPlugin({
    minify: { collapseWhitespace: true },
    template: './index.html',
  }),

  env('development', [
    devServer({
      contentBase: resolve(src, 'static'),
      historyApiFallback: true,
      hot: true,
      port: 5000,
      overlay: true,
    }),
  ]),

  clean(['build']),

  env('production', [
    uglify(),
  ]),

])
