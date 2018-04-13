const path = require( 'path' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
