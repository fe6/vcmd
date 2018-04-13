const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');

// 公共函数
const { resolve, pkg } = require( '../common' );

const { publicFolder, entryFile, outputFolder } = pkg.fe6vcmd;

const entryPath = publicFolder + '/' + entryFile;
const outputPath = publicFolder + '/' + outputFolder;

const webpackConfigDev = require('../config/webpack.dist.dev.config');
const webpackConfigProd = require('../config/webpack.dist.prod.config');
const webpackConfigStyleProd = require('../config/webpack.dist.style.prod.config');

const build = function(wpkConfig) {
  return new Promise(function (resolve, reject) {
      webpack(wpkConfig, function (err, stats) {
        if (err) {
          reject(err);
        }

        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n');

        resolve();
      })
  });
};

const spinner = ora('📦 正在构建...');
spinner.start();

rm(resolve ( outputFolder ), err => {

  if (err) throw err;

  // 打包 js | css
  Promise.all([
    build(webpackConfigDev),
    build(webpackConfigStyleProd),
    build(webpackConfigProd),
  ]).then(function() {
    spinner.stop();
    console.log(chalk.cyan('✅  ') + chalk.redBright.bold(pkg.name) + chalk.cyan('  构建完成.\n'))
  }, function() {
    throw err;
  });

})
