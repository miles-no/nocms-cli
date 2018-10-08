const execute = require('../helpers').execute;
const chalk = require('chalk');

const createVolumes = (context) => {
  const volumes = [];
  context.containers.forEach((container) => {
    if (container.volumes) {
      container.volumes.forEach((volume) => {
        volumes.push({
          container: container.name,
          volume: volume.substring(0, volume.indexOf(':')),
        });
      });
    }
  });
  console.log('');
  console.log(chalk.green('    Creating data volumes'));
  volumes.forEach((v) => {
    execute(`docker volume create --name ${v.volume}`);
    console.log(`    Created volume ${chalk.bold.yellow(v.volume)} for ${chalk.bold.yellow(v.container)}`);
  });

  console.log('');
};

module.exports = (context) => {
  console.log('');
  console.log(chalk.green('    Creating docker network'));

  const result = execute(`docker network create ${context.network ? `--subnet="${context.network}"` : ''} ${context.namespace}`);

  if (result) {
    console.log(`    Network for namespace ${chalk.bold.yellow(context.namespace)} (${chalk.bold.yellow(context.network)}) created`);
  }

  createVolumes(context);
};
