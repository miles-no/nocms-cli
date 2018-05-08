const configApiServer = require('nocms-config-api-server');
const logger = require('nocms-logger');

const data = require('./config.json');

configApiServer
  .setData(data)
  .setAdapter('main_web_server',    require('./adapters/main_web_server'))
  .setAdapter('admin_login',        require('./adapters/admin_login'))
  .setAdapter('authorization_api',  require('./adapters/authorization_api'))
  .setAdapter('authentication_api', require('./adapters/authentication_api'))
  .setAdapter('cloudinary',         require('./adapters/cloudinary'))
  .setAdapter('fragment_api',       require('./adapters/fragment_api'))
  .setAdapter('i18n_api',           require('./adapters/i18n_api'))
  .setAdapter('message_api',        require('./adapters/message_api'))
  .setAdapter('page',               require('./adapters/page'))
  .setAdapter('people_admin',       require('./adapters/people_admin'))
  .setAdapter('people_api',         require('./adapters/people_api'))
  .setAdapter('smiles_admin',       require('./adapters/smiles_admin'))
  .setAdapter('smiles_api',         require('./adapters/smiles_api'))
  .setAdapter('widget_api',         require('./adapters/widget_api'))
  .setAdapter('miles_camp_admin',   require('./adapters/miles_camp_admin'))
  .setAdapter('miles_camp',         require('./adapters/miles_camp'))
  .on('warning', logger.warn)
  .on('error', logger.error)
  .on('info', logger.info)
  .start();
