const path = require( 'path' );
const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
// 百分比进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const FriendlyErrorsPlugin = require( 'friendly-errors-webpack-plugin' );
const chalk = require( 'chalk' );
const StyleLintPlugin = require( 'stylelint-webpack-plugin' );
// 配置的模块解析 loader
const commonConfig = require( './module' );
// 公共函数
const { resolve, pkg } = require( '../common' );

const { publicFolder, entryFile, outputFolder, entryFolder, rootFolder } = pkg.fe6vcmd;

const entryPath = publicFolder + '/' + entryFile;
const outputPath = publicFolder + '/' + outputFolder;

const entryFolderReg = new RegExp(entryFolder);

module.exports = {
  entry: {
    main: resolve ( entryPath )
  },
  // 输出
  output: {
    path: resolve( outputPath ),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  cache: true,
  mode: 'development',
  devtool: '#eval-source-map',
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: commonConfig,
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: resolve( './tsconfig.json' )
      })
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new ProgressBarPlugin({
      format: '📦'+ chalk.blue('构建进度:') + ' '+ chalk.redBright.bold('[:bar]') + ' ' + chalk.magentaBright.bold(':percent') + ' ' + chalk.magentaBright.bold(':elapsed seconds'),
    }),
    new StyleLintPlugin({
      configFile: path.join(__dirname, "../../.stylelintrc"),
    }),
    new HtmlWebpackPlugin( {
      inject: true,
      filename: resolve('./'+ outputPath +'/index.html' ),
      template: resolve('./'+ publicFolder +'/index.html' )
    } ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(chalk.magenta(msg));
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\n ✅  webpack: 编译完成.\n'));
      }
    })
  ]
}
