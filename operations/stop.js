const execute = require('../helpers').execute;
const getImageName = require('../helpers').getImageName;
const chalk = require('chalk');

module.exports = (context) => {
  console.log('');
  console.log(chalk.green('    Stopping containers...'));

  context.containers.forEach((container) => {
    console.log('    Stopping ' + container.name);
    const name = container.name;
    const localName = getImageName(container, true);
    execute(`docker rm -f ${localName.replace(/_dev$/, '').replace(/_/g, '-')}`);
    execute(`docker rm -f ${name.replace(/_/g, '-')}`);
  })

  console.log('');
};
