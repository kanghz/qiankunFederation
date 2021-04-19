const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const { name } = require('../package');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://localhost:8101/'
  },
})