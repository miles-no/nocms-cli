const start = require('./start');
const stop = require('./stop');

module.exports = (context, args) => {
  stop(context, args);
  start(context, args);
};
