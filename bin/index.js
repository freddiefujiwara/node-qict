#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package')

let fileValue = undefined

program
  .version(pkg.version)
  .description(pkg.description)
  .usage('qict <flle>')
  .arguments('<file>')
  .action((file) => {
    fileValue = file;
  })
program.parse(process.argv)
if (typeof fileValue === 'undefined'){
  console.error(program.usage())
  process.exit(1)
}

const Qict = require('../src/qict');
const q = new Qict();
q.printResult(
  q.readFile(fileValue)
  .initialize()
  .testSets()
);
