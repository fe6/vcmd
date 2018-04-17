#!/usr/bin/env node

'use strict';

// https://www.npmjs.com/package/colorful
require('colorful').colorful();
// https://www.npmjs.com/package/commander
const program = require('commander');
const packageInfo = require('../../package.json');


program
    .version(packageInfo.version)

program
    .command('server') // fe6vc server
    .description('本地启动一个服务')
    .alias('s') // 简写
    .action(() => {
      require('../cmd/server');
    });

program
    .command('build') // fe6vc build
    .description('打包项目到生产环境')
    .alias('b') // 简写
    .action(() => {
      require('../cmd/build');
    });

program
    .command('lint') // fe6vc lint
    .description('语法检测')
    .alias('l') // 简写
    .action(() => {
      require('../cmd/lint');
    });

program.parse(process.argv);

if(!program.args.length){
  program.help()
}
