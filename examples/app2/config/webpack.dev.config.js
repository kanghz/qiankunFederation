const config = require('./webpack.config');
const {merge} = require('webpack-merge');

const devServer = {
  // contentBase: path.resolve(__dirname, "../dist"),
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  // hot: true,
  // historyApiFallback: true,
  host: '0.0.0.0',
  compress: true,
  port: 7102,
}
module.exports = merge(config, {
  mode: 'development',
  devServer
})