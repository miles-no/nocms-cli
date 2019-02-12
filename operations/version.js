const path = require('path');
const readPkgUp = require('read-pkg-up');

delete require.cache[__filename];
const parentDir = path.dirname(module.parent.filename);

const pkg = readPkgUp.sync({
  cwd: parentDir,
  normalize: false,
}).pkg;

module.exports = () => {
  console.log(pkg.version);
};
