const chalk = require('chalk');
const fs = require('fs');
const getNormalizedPath = require('../helpers').getNormalizedPath;
const execute = require('../helpers').execute;

const runContainer = (context, container) => {
  const {
    namespace,
    root,
  } = context;
  const {
    isExternal,
    name,
    flags = [],
    ports = [],
    volumes = [],
    ip = false,
    timezone = false,
    doNotRun = false,
  } = container;

  if (doNotRun) {
    console.log(`     Skipping ${chalk.bold(container.name)}... (doNotRun flag set)`);
    return;
  }

  console.log(`     Starting ${isExternal ? 'external container ' : ''}${chalk.bold(container.name)}...`);

  const portMapping = ports.reduce((str, mapping) => {
    return `-p ${mapping} ${str}`;
  }, '');

  if (!isExternal) {
    const appPath = `${root}/containers/${name}/app`;

    if (fs.existsSync(appPath)) {
      let normalizedAppPath = getNormalizedPath(appPath);
      normalizedAppPath = normalizedAppPath.replace(/\r?\n|\r/g, ' ');

      volumes.push(`"${normalizedAppPath}":/usr/src/app`);
    } else {
      console.log(chalk.red(`     The volume path ${appPath} does not exist`));
    }
  }

  const volumeParams = volumes.reduce((str, volume) => {
    return `-v ${volume} ${str}`;
  }, '');

  flags.push(`-e CRYPTEX_KEYSOURCE_PLAINTEXT_KEY=${process.env.CRYPTEX_KEYSOURCE_PLAINTEXT_KEY}`);
  flags.push('-e NODE_ENV=development');
  if (timezone) {
    flags.push(`-e TZ=${timezone}`);
  }
  const image = isExternal ? container.image : `${namespace}-${name}-local`;

  const cmd = `docker run -d --name ${name} ${flags.join(' ')} ${ip ? `--ip="${ip}"` : ''} ${volumeParams} ${portMapping} --net ${namespace} ${image}`;
  // console.log(cmd);
  execute(cmd);
};

module.exports = (context, args) => {
  console.log('');
  const containersToRun = context.containers;

  if (args && args[0]) {
    const container = context.containers.find((c) => {
      return c.name === args[0];
    });
    if (container) {
      console.log(chalk.green('     Starting single container...'));
      runContainer(context, container);
    } else {
      console.log(chalk.red(`     Could not find container ${args[0]}`));
    }
    return;
  }

  console.log(chalk.green('     Starting containers...'));
  containersToRun.forEach((c) => {
    return runContainer(context, c);
  });
  console.log('');
};
