const path = require('path')
const SRC = path.join(__dirname, '/client/src')
const DIS = path.join(__dirname, '/client/dist')

module.exports = {
  mode: "development",
  entry: `${SRC}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIS
  },
  module: {
    rules: [      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
//   performance: {
//     hints: false,
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000
// }
}

