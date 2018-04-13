const merge = require( 'webpack-merge' );

const webpackBaseConfig = require( './webpack.base.config.js' );

// 配置的模块解析 loader
const commonConfig = require( './module' );

// 公共函数
const { resolve, pkg } = require( '../common' );

module.exports = merge( webpackBaseConfig, {
  output: {
    filename: pkg.outname + '.js'
  },
  // 加载器
  module: commonConfig,
} );
