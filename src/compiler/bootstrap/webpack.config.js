const path = require('path')

const contextPath = path.resolve(__dirname, './app')
const outputPath = path.resolve(__dirname, '../build')

const appEntry = []
appEntry.push('./index.js')

const plugins = []

module.exports = {
  entry: {
    app: appEntry,
  },
  output: {
    filename: '[name]-bundle.js',
    publicPath: '/',
    path: outputPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  context: contextPath,
  plugins
}
