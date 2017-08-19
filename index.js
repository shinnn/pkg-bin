/*!
 * pkg-bin | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/pkg-bin
*/
'use strict';

const inspectWithKind = require('inspect-with-kind');

module.exports = function pkgBin(pkgData) {
  if (!pkgData || typeof pkgData !== 'object' || Array.isArray(pkgData)) {
    throw new TypeError(`Expected a package.json object \`{name: ..., version: ..., description: ...}\`, but got ${
      inspectWithKind(pkgData)
    }.`);
  }

  if (!('name' in pkgData)) {
    throw new TypeError('Expected the package data to have `name` property, but it doesn\'t.');
  }

  if (typeof pkgData.name !== 'string') {
    throw new TypeError(`Expected \`name\` property of the package data to be a string, but it was ${
      inspectWithKind(pkgData.name)
    }.`);
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
      `Expected \`bin\` property to be a map of command name to local file name (object), or a single file name (string), but it was ${
        inspectWithKind(pkgData.bin)
      }.`
    );
  }

  return null;
};
