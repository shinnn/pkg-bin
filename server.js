#!/usr/bin/env node

const resolve = require('path').resolve

const pkgBin = require('.')


const argv = process.argv
if(argv.length < 3)
{
  console.warn(`Usage: ${argv[1]} <package.json>`)
  process.exit(1)
}

const result = pkgBin(require(resolve(__dirname, argv[2])))
if(!result) process.exit(2)

console.log(result)
