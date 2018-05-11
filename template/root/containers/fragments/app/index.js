/* eslint global-require: off */
const config = require('nocms-config-client');
const logger = require('nocms-logger');

config.init('fragments')
  .then(() => {
    logger.setConfig(config.get('logConfig'));
    require('./server');
  })
  .catch((err) => {
    logger.error('Couldn\'t start server', err);
  });
