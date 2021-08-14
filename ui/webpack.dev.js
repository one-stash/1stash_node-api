const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "0.0.0.0",
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true
  },
  plugins: [
    new DefinePlugin({
      PRODUCTION: false
    })
  ]
})