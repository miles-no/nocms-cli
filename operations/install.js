const execute = require('../helpers').execute;
const chalk = require('chalk');

const installNPMPackages = (context, container) => {
  const target = `${context.root}/containers/${container.name}/app`;
  console.log(`       Installing dependencies for ${container.name} in ${target}`);

  execute(`cd ${target} && npm install`);
};

module.exports = (context) => {
  console.log('');
  console.log(chalk.green('     Installing NPM packages...'));

  const containersWithPackages = context.containers.filter((c) => !c.isExternal && c.name !== 'varnish');
  containersWithPackages.forEach((c) => installNPMPackages(context, c));

  console.log('');
};
