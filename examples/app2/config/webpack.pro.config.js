const config = require('./webpack.config');
const {merge} = require('webpack-merge');
const { name } = require('../package');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = merge(config, {
  mode: 'production',
  output:{
    publicPath:'http://localhost:8101/'
  },
  plugins:[
    new WebpackManifestPlugin()
  ]
})