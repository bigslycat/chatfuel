/* @flow */

const { resolve } = require('path')

const {
  createConfig,
  env,

  entryPoint,
  setOutput,
  setContext,
  setDevTool,
  setEnv,

  file,
  match,
  uglify,
  devServer,
} = require('webpack-blocks')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const babelPreset = require('./src/config/webpack/babelPreset')
const htmlPlugin = require('./src/config/webpack/htmlPlugin')
const clean = require('./src/config/webpack/clean')

const src = resolve(__dirname, 'src')
const front = resolve(src, 'front')

module.exports = createConfig([

  setContext(front),
  entryPoint({ main: './index.js' }),

  setOutput({
    path: resolve(__dirname, 'docs'),
    filename: '[name].[hash].bundle.js',
  }),

  setDevTool('source-map'),

  match(['*.svg'], [
    file(),
  ]),

  babelPreset({
    test: /\.js$/,
    exclude: [
      resolve(__dirname, 'node_modules'),
    ],
    query: {
      babelrc: false,
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
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

  setEnv({
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL || '//virtserver.swaggerhub.com/bigslycat/chatfuel/1.0.0/api',
  }),

  env('development', [
    devServer({
      contentBase: resolve(src, 'static'),
      historyApiFallback: false,
      hot: true,
      port: 5000,
      overlay: true,
    }),
  ]),

  clean(['docs']),

  env('production', [
    uglify(),
  ]),

])
