#!/usr/bin/env node

var apidoc = require('apidoc'),
  MD = require('../'),
  yargs = require('yargs')
    .usage('$0 [options]')
    .command('generate', 'generate README from the template')
    .option('o', {
      alias: 'output',
      describe: 'path to output expanded template to',
      default: './README.md'
    })
    .option('t', {
      alias: 'template',
      describe: 'the README template to use',
      default: './README.md.mustache'
    })
    .option('s', {
      alias: 'src',
      describe: 'where does your code live?',
      default: './lib'
    })
    .help('h')
    .alias('h', 'help')
    .version(require('../package.json').version, 'v')
    .alias('v', 'version'),
    argv = yargs.argv,
    options = {
      excludeFilters: '',
      includeFilters: '.*\\.(clj|coffee|cs|dart|erl|go|java|js|litcoffee|php?|py|rb|scala|ts|pm)$',
      src: argv.src,
      dest: './doc',
      template: './',
      config: './',
      verbose: false,
      debug: false,
      parse: true,
      colorize: true,
      filters: null,
      languages: null,
      parsers: null,
      workers: null,
      silent: true,
      simulate: true,
      markdown: true,
      lineEnding: '\n'
    }

if (~argv._.indexOf('generate')) {
  ;(new MD(JSON.parse(apidoc.createDoc(options).data), {
    template: argv.template,
    output: argv.output
  })).writeTemplate(function () {
    console.log('generated ' + argv.output + ' from ' + argv.template)
  })
} else {
  yargs.showHelp()
}
