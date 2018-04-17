const { spawnSync } = require('child_process');
const path = require('path');

// 公共函数
const { resolve, pkg } = require( '../common' );

const { rootFolder, entryFolder, entryStyleFolder } = pkg.fe6vcmd;

// ts|vue 的语法检测
spawnSync('node',[
  resolve('node_modules/.bin/eslint'),
  '--ext', '.ts',
  '--ext', '.vue',
  '-c', path.join(__dirname, '', '../../.eslintrc.js'),
  resolve(rootFolder+'/'+entryFolder+'/**/*'),
  '--fix'
]);

// scss 的语法检测
spawnSync('node',[
  resolve('node_modules/.bin/stylelint'),
  resolve(rootFolder+'/'+entryStyleFolder+'/**/*.scss'),
  '--config', path.join(__dirname, '', '../../.stylelintrc'),
  '--fix'
]);
