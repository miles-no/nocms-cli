const config = require('nocms-config-client');
const logger = require('nocms-logger');

const errorHandler = (err) => {
  logger.error('Couldn\'t start server', err);
};

config.init('web_api')
  .then(() => {
    logger.setConfig(config.get('logConfig'));
    require('./server');
  })
  .catch(errorHandler);
