module.exports = ({ test, include, exclude, query }) =>
  (context, { merge }) => merge({
    module: { rules: [{ test, include, exclude, use: [{ loader: 'babel-loader', query }] }] },
  })
