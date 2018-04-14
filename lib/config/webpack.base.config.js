const path = require( 'path' );
const webpack = require( 'webpack' );
const chalk = require( 'chalk' );
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// 百分比进度
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// 公共函数
const { resolve, pkg } = require( '../common' );

const { publicFolder, entryFile, outputFolder, entryFolder, rootFolder } = pkg.fe6vcmd;

// 配置的模块解析 loader
const commonConfig = require( './module' );
// 公共的 banner
const banner = require( './banner' )();

module.exports = {
  entry: {
    main: resolve ( rootFolder + '/'+ entryFolder + '/' + entryFile ),
  },
  output: {
    path: resolve ( outputFolder ),
    publicPath: '/'+ outputFolder +'/',
    filename: pkg.outname + '.js',
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  cache: true,
  mode: 'development',
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
  externals: {
    'vue-class-component': {
      root: 'vue-class-component',
      commonjs: 'vue-class-component',
      commonjs2: 'vue-class-component',
      amd: 'vue-class-component'
    },
    'vue-property-decorator': {
      root: 'vue-property-decorator',
      commonjs: 'vue-property-decorator',
      commonjs2: 'vue-property-decorator',
      amd: 'vue-property-decorator'
    },
    vue: {
      root: 'vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: {
    hints: false
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new ProgressBarPlugin({
      format: '📦'+ chalk.blue('构建进度:') + ' '+ chalk.redBright.bold('[:bar]') + ' ' + chalk.magentaBright.bold(':percent') + ' ' + chalk.magentaBright.bold(':elapsed seconds'),
    }),
    // 注入内容
    new webpack.BannerPlugin( banner )
  ]
};
