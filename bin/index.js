#!/usr/bin/env node

const pkg = require('../package')
const argv = require('minimist')(process.argv.slice(2));
if (argv['_'].length < 1 || typeof argv['h'] !== 'undefined'){
  console.error("================================================================================");
  console.error(pkg.description);
  console.error("");
  console.error(`Author     : ${pkg.author}`);
  console.error(`Homepage   : ${pkg.homepage}`);
  console.error(`LICENSE    : ${pkg.license}`);
  console.error(`Report bugs: ${pkg.bugs.url}`);
  console.error("================================================================================");
  console.error("");
  console.error("Usage: qict [-h] <file>");
  console.error("");
  process.exit(1);
}

const Qict = require('../src/qict');
const q = new Qict();
q.printResult(
  q.readFile(argv['_'][0])
  .initialize()
  .testSets()
);
