'use strict';
const chalk = require('chalk');
const dockerNetwork = 'nocms';
const execute = require('./helpers').execute;
const getImageName = require('./helpers').getImageName;

module.exports = (context, container, runLocal) => {
  if(container.doNotRun){
    return;
  }
  console.log('     Starting ' + (container.isExternal ? 'external container ': '') + container.name + ' ' + (container.isExternal ? '' : (runLocal ? 'with local source code' : 'from registry')) + '...');
  if (!container) {
    console.error('     ' + chalk.red.bold('Invalid container name: ') + container.name);
    return;
  }
  const { name, localImage, image, ip, flags = [], ports, volumes = []} = container;
  const portMapping = !!ports ? ports.reduce((str, mapping) => { return '-p ' + mapping + ' ' + str; }, '') : '';

  volumes.push(`${context.root}/logs/${container.name}:/log`);
  if (runLocal) {
    volumes.push(`${context.root}/containers/${container.name}/app:/usr/src/app`);
  }

  const volumeParams = volumes.reduce((str, volume) => { return '-v ' + volume + ' ' + str; }, '');

  flags.push(`-e CRYPTEX_KEYSOURCE_PLAINTEXT_KEY=${process.env.CRYPTEX_KEYSOURCE_PLAINTEXT_KEY}`);
  flags.push(`-e NODE_ENV=${process.env.NODE_ENV}`);
  flags.push(`-e NPM_AUTH=${process.env.NPM_AUTH}`);

  const imageName = getImageName(container, runLocal);
  const cmd = `docker run -d --name ${runLocal ? imageName.replace(/_dev$/, '').replace(/_/g, '-') : name} ${flags.join(' ')} ${volumeParams} ${portMapping} --net ${context.namespace} ${container.isExternal ? container.image : imageName}`;
  execute(cmd);
};
