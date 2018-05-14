const configApiServer = require('nocms-config-api-server');
const logger = require('nocms-logger');

const data = require('./config.json');

configApiServer
  .setData(data)
  .setAdapter('web',                require('./adapters/web'))
  .setAdapter('fragments',          require('./adapters/fragments'))
  .setAdapter('web_api',            require('./adapters/web_api'))
  .setAdapter('page',               require('./adapters/page'))
  .setAdapter('authorization_api',  require('./adapters/authorization_api'))
  .setAdapter('authentication_api', require('./adapters/authentication_api'))
  .setAdapter('cloudinary',         require('./adapters/cloudinary'))
  .setAdapter('i18n_api',           require('./adapters/i18n_api'))
  .setAdapter('message_api',        require('./adapters/message_api'))

  
  .on('warning', logger.warn)
  .on('error', logger.error)
  .on('info', logger.info)
  .start();
