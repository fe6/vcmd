const merge = require( 'webpack-merge' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// 公共函数
const { resolve, pkg } = require( '../common' );

const { rootFolder, entryStyleFolder, entryStyleFile } = pkg.fe6vcmd;

const webpackBaseConfig = require( './webpack.base.config.js' );

module.exports = merge( webpackBaseConfig, {
  entry: {
    main: resolve(rootFolder + '/' + entryStyleFolder + '/' + entryStyleFile)
  },
  output: {
    filename: pkg.outname + '.min.js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'cache', 'css', 'sass',
          {
            loader: 'postcss',
            options: {
              config: {
                path: '.postcssrc.js'
              }
            }
          }
        ]
      }
    ],
  },
  performance: {
    hints: false
  },
  optimization: {
    minimizer: [
      // 压缩
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    // 提取
    new MiniCssExtractPlugin({
      filename: pkg.outname + '.css'
    })
  ]
} );
