const path = require( 'path' );
// 当前运行的路径
const root = process.cwd();
// 目标目录的包管理
const pkg = require(root + '/package.json');

const defaultConfig = {
  "publicFolder": "example",
  "entryStyleFile": "index.ts",
  "entryStyleFolder": "style",
  "entryFile": "index.ts",
  "entryFolder": "component",
  "outputFolder": "dist",
  "rootFolder": "src",
  "port": 3000
};
// 如果 package.json 中没有针对 fe6vcmd 的配置
pkg.fe6vcmd = Object.assign({}, defaultConfig, pkg.fe6vcmd);

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
