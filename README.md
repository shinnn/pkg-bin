# pkg-bin

[![NPM version](https://img.shields.io/npm/v/pkg-bin.svg)](https://www.npmjs.com/package/pkg-bin)
[![Build Status](https://travis-ci.org/shinnn/pkg-bin.svg?branch=master)](https://travis-ci.org/shinnn/pkg-bin)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/pkg-bin.svg)](https://coveralls.io/r/shinnn/pkg-bin)

Get a command name from a [package.json](https://docs.npmjs.com/files/package.json) object

```javascript
const pkgBin = require('pkg-bin');

const pakcageJson = {
  name: 'my-tool-cli',
  bin: {
    'my-tool': 'lib/cli.js'
  }
};

pkgBin(pakcageJson); //=> 'my-tool'
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install pkg-bin
```

## API

```javascript
const pkgBin = require('pkg-bin');
```

### pkgBin(*pkgData*)

*pkgData*: `Object` ([package.json](https://github.com/npm/npm/blob/master/doc/files/package.json.md) object)  
Return: `String` (a command name)

It returns a command name of the given package.

```javascript
pkgBin({
  name: 'hi',
  bin: 'path/to/bin.js'
}); //=> 'hi'
```

If the package includes multiple commands, it returns the first one.

```javascript
pkgBin({
  name: 'hi',
  bin: {
    hello1: 'path/to/hello1.js',
    hello2: 'path/to/hello2.js'
    hello3: 'path/to/hello3.js'
  }
}); //=> 'hello1'
```

If the package includes no commands, it returns `null`.

```javascript
pkgBin({name: 'hi'}); //=> null
```

## License

[Creative Commons Zero v1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed)
