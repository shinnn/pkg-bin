/*!
 * pkg-bin | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/pkg-bin
*/
'use strict';

const util = require('util');

module.exports = function pkgBin(pkgData) {
  if (!pkgData || typeof pkgData !== 'object' || Array.isArray(pkgData)) {
    throw new TypeError(
      util.inspect(pkgData) +
      ' is not a plain object. Expected a package.json object `{name: ..., version: ..., description: ...}`.'
    );
  }

  if (!('name' in pkgData)) {
    throw new TypeError(
      'Expected the package data to have `name` property, but it doesn\'t.'
    );
  }

  if (typeof pkgData.name !== 'string') {
    throw new TypeError(
      util.inspect(pkgData.name) +
      ' is not a string. `name` property of the package data must be a string.'
    );
  }

  if (typeof pkgData.bin === 'string') {
    return pkgData.name;
  }

  if (pkgData.bin && typeof pkgData.bin === 'object' && !Array.isArray(pkgData.bin)) {
    const keys = Object.keys(pkgData.bin);

    if (keys.length === 0) {
      throw new Error(
        '`bin` property doesn\'t have any enumerable properties.' +
        ' It must include at least one property.'
      );
    }

    if (pkgData.bin[pkgData.name]) {
      return pkgData.name;
    }

    return Object.keys(pkgData.bin)[0];
  }

  if (pkgData.bin !== undefined) {
    throw new TypeError(
      util.inspect(pkgData.bin) +
      ' is neither a string nor plain object.' +
      ' `bin` property must be a map of command name to local file name, or a single file name.'
    );
  }

  return null;
};
