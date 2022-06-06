const path = require('path')
const SRC = path.join(__dirname, '/client/src')
const DIS = path.join(__dirname, '/client')

module.exports = {
  mode: "production",
  entry: `${SRC}/app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIS
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}

