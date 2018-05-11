const config = require('nocms-config-client');
const logger = require('nocms-logger');

global.environment = 'server';

config.init('web').then((cfg) => {
  logger.setConfig(cfg.logConfig);
  process.on('uncaughtException', (exception) => {
    logger.error('Uncaught exception', exception);
  });
  require('./src/server'); // eslint-disable-line
}).catch((exception) => {
  console.log('Could not start server', exception); // eslint-disable-line
});
