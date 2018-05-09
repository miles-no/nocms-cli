
const help = require('./help');
const init = require('./init');
const build = require('./build');
const install = require('./install');
const start = require('./start');
const stop = require('./stop');
const create = require('./create');
const update = require('./update');
const context = require('./print_context');
const crypto = require('./crypto');

const operations = {
  help,
  context: context.details,
  init,
  create,
  install,
  build,
  start,
  stop,
  update,
  encrypt: crypto.encrypt,
  decrypt: crypto.decrypt,
};

module.exports = operations;
