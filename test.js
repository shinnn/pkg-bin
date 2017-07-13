'use strict';

const pkgBin = require('.');
const test = require('tape');

test('pkgBin()', t => {
  t.strictEqual(pkgBin.name, 'pkgBin', 'should have a function name.');

  t.strictEqual(
    pkgBin({name: 'foo', bin: 'cli.js'}),
    'foo',
    'should return a package name when `bin` property is a local file name.'
  );

  t.strictEqual(
    pkgBin({name: 'foo', bin: {hi: 'bin1.js', hello: 'bin2.js'}}),
    'hi',
    'should return the first `bin` property name when `bin` is an object.'
  );

  t.strictEqual(
    pkgBin({name: 'foo'}),
    null,
    'should return null when package.json doesn\'t have `bin` property.'
  );

  t.throws(
    () => pkgBin(['Hi']),
    /TypeError.*\[ 'Hi' \] is not a plain object\. Expected a package\.json object/,
    'should throw a type error when the argument is not a plain object.'
  );

  t.throws(
    () => pkgBin({bin: 'cli.js'}),
    /TypeError.*Expected the package data to have `name` property, but it doesn't\./,
    'should throw a type error when the object doesn\'t have `name` property.'
  );

  t.throws(
    () => pkgBin({name: 1, bin: 'cli.js'}),
    /TypeError.*1 is not a string\. `name` property of the package data must be a string\./,
    'should throw a type error when `name` property is not a string.'
  );

  t.throws(
    () => pkgBin({name: 'foo', bin: null}),
    /TypeError.*null is neither a string nor plain object\./,
    'should throw a type error when `bin` property is neither a string nor object.'
  );

  t.throws(
    () => pkgBin({name: 'foo', bin: {}}),
    /Error.*`bin` property doesn't have any enumerable properties\./,
    'should throw an error when `bin` property is an empty object.'
  );

  t.end();
});
