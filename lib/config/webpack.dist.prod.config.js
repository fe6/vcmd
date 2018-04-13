const webpack = require( 'webpack' );
const merge = require( 'webpack-merge' );

const webpackBaseConfig = require( './webpack.base.config.js' );

// 公共函数
const { pkg } = require( '../common' );
// 配置的模块解析 loader
const commonConfig = require( './module' );

module.exports = merge( webpackBaseConfig, {
  output: {
    filename: pkg.outname + '.min.js'
  },
  mode: 'production',
  module: commonConfig,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    },
  },
} );
