/* eslint-disable no-console */
import React from 'react';
import logger from 'nocms-logger';
import nocmsServer from 'nocms-server';
import configClient from 'nocms-config-client';
import templates from './config/templates';

const config = configClient.get();
const timeStamp = new Date().getTime();

logger.setConfig({
  timestampFormat: '%d %H:%M:%S',
  logFormat: '%T %L - %C',
  logLevel: 'debug',
  logAsJson: false,
  useChalk: true,
  output: {
    all: ['console'],
  },
});

const initConfig = {
  adminTokenSecret: config.adminTokenSecret,
  pageService: config.pageService,
  i18nApi: config.i18nApi,
  languageList: config.languageList,
  commonAppScript: `/assets/js/commons.js?v=${timeStamp}`,
  clientAppScript: `/assets/js/nocms.js?v=${timeStamp}`,
  mainCss: `/assets/css/main.css?v=${timeStamp}`,
  adminAppCss: `/assets/css/admin.css?v=${timeStamp}`,
  adminAppScript: `/assets/js/admin.js?v=${timeStamp}`,
  logger,
  client: config.client,
  verbose: config.verboseLogging,
};

const areas = {
  topContent: () => { return <h1>Top content</h1>; },
  headContent: () => { return <span>Head content</span>; },
  bottomContent: () => { return <span>Bottom content</span>; },
};

nocmsServer.init(initConfig)
  .addRedirect(config.publisherLoginUrl, '/api/login/local')
  .addRedirect(config.publisherLogoutUrl, '/api/login/logout')
  .setRobotsTxt('./src/config/robots.txt')
  .setAreas(areas)
  .setTemplates(templates)
  .start();
