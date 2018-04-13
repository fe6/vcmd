const path = require( 'path' );
// 公共函数
const { resolve, pkg } = require( '../common' );

const { entryFolder, publicFolder, rootFolder } = pkg.fe6vcmd;

const entryFolderReg = new RegExp(entryFolder);

module.exports = {
  rules: [
    {
      test: /\.(ts|vue)$/,
      loader: 'eslint',
      exclude: /node_modules/,
      enforce: 'pre',
      include: entryFolderReg,
      options: {
        configFile: path.join(__dirname, "../../.eslintrc.js"),
        formatter: require('eslint-friendly-formatter'),
        cache: true,
      }
    },
    {
      test: /\.vue$/,
      include: new RegExp(entryFolder + '|' + publicFolder),
      use: [
        'cache',
        'vue'
      ]
    },
    {
      test: /\.scss$/,
      use: [
        'cache',
        'style',
        'css',
        'sass'
      ]
    },
    {
      test: /\.tsx?$/,
      loader: 'ts',
      exclude: /node_modules/,
      include: new RegExp(rootFolder + '|' + publicFolder),
      options: {
        appendTsSuffixTo: [/\.vue$/],
        silent: true,
      }
    },
  ]
};
