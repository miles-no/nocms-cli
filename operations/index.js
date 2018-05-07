
const help = require('./help');
const init = require('./init');
// const build = require('./build');
// const pull = require('./pull');
// const install = require('./install');
const start = require('./start');
const stop = require('./stop');
const create = require('./create');
// const one = require('./one');
// const pullImages = require('./pull_images');
// const createVolumes = require('./createVolumes');
// const update = require('./update');
// const cd = require('./cd');
const context = require('./print_context');
const crypto = require('./crypto');

const operations = {
  help,
  context: context.details,
  init,
  create,
  // pull,
  // install,
  // build,
  start,
  stop,
  // one,
  // pullImages,
  // createVolumes,
  // update,
  // cd,
  encrypt: crypto.encrypt,
  decrypt: crypto.decrypt,
};

module.exports = operations;
