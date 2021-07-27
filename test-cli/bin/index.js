#!/usr/bin/env node

const lib = require('test-cli-lib');

// // 注册一个命令 cli-demo01 init
// const argv = require('process').argv
// const command = argv[2]
// const options = argv.slice(3)
// if (!(command.startsWith('--') || command.startsWith('-'))) {
//   let [option, param] = options.length ? options : ['defaultOption', 'defaultParam']
//   option = option.replace('--', '')
    
//   if (command) {
//     if (lib[command]) {
//       lib[command]({option, param })
//     } else {
//       console.log('无效的命令')
//     }
//   } else {
//     console.log('请输入命令')
//   }   
  
// }

// // 实现参数解析 --version 和 init --name
// if (command.startsWith('--') || command.startsWith('-')) {
//   const globalOption = command.replace(/--|-/g, '')
//   if (['version', 'V'].includes(globalOption)) {
//     console.log('v1.0.0')
//   }
// }

const yargs = require('yargs/yargs')
const dedent = require("dedent")
const pkg = require("../package.json")

const cli = yargs()
const argv = process.argv.slice(2)

const context = {
  testVersion: pkg.version,
}

cli
.usage('Usage: test-cli [command] <options>') // 第一行输出使用说明
.demandCommand(1, 'A command is required. Pass --help to see all available commands and options.')
.strict() // 严格模式，未识别命令给出错误提示
.recommendCommands() // 输入未识别错误命令给出提示
.fail((err, msg) => { // 当输入未识别错误命令时个性化错误
  console.log('err', err);
  console.log('msg', msg);
})
.alias("h", "help") // 别名
.alias("v", "version")
.wrap(cli.terminalWidth()) // 终端左右宽度
// epilogue结尾说明 dedent去掉空格缩进
.epilogue(dedent`
    When a command fails, all logs are written to lerna-debug.log in the current working directory.
    For more information, find our manual at https://github.com/zhanghe-V/dg-cli
`)
.options({ // 定义命令参数组
  debug: {
    type: 'boolean',
    describe: "Bootstrap debug mode.",
    alias: 'd'
  },
  loglevel: {
    defaultDescription: "info",
    describe: "What level of logs to report.",
    type: "string",
    alias: 'l'
  }
})
.option("ci", { // 定义单个命令参数
  hidden: true,
  type: "boolean",
  describe: "Define global options",
})
.group(["help", "version"], "Global Options:") // 对命令参数进行分组
.group(["loglevel"], "Lerna Options:")
// 命令(命令，说明，builder, handler)
.command('init [name]', 'Do Init a project', (yargs) => {
  yargs
  .option('name', {
    type: 'string',
    describe: 'Name of a project',
    alias: 'n'
  })
}, (argv) => {
  console.log(argv)
})
.command({
  command: "list",
  aliases: ["ls", "la", "ll"],
  describe: "List local packages",
  builder: (yargs) => {},
  handler: (argv) => {
    console.log(argv);
  },
})
.parse(argv, context) // 可以往argv中注入参数