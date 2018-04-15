const path = require( 'path' );
// 当前运行的路径
const root = process.cwd();
// 目标目录的包管理
const pkg = require(root + '/package.json');

const defaultConfig = {
  "outputFolder": "dist",
  "publicFolder": "example",
  "rootFolder": "src",
  "entryStyleRoot": "asset",
  "entryStyleFolder": "style",
  "entryStyleFile": "index.ts",
  "entryFolder": "component",
  "entryFile": "index.ts",
  "port": 3000
};
// 如果 package.json 中没有针对 fe6vcmd 的配置
pkg.fe6vcmd = Object.assign({}, defaultConfig, pkg.fe6vcmd);
// 打包之后过滤包命名空间 @fe6/test => test
pkg.outname = pkg.name.split('/')[1];

module.exports = {
  root,
  pkg,
  resolve: function(dir) {
    return path.join(root, '', dir);
  },
  zeroFill: function(time) {
    return time < 10 ? '0' + time : time.toString();
  },
};
