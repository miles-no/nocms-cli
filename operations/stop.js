const execute = require('../helpers').execute;
const getImageName = require('../helpers').getImageName;
const chalk = require('chalk');

module.exports = (context, args) => {
  console.log('');
  console.log(chalk.green('    Stopping containers...'));

  if (args && args[0]) {
    const container = context.containers.find((c) => c.name === args[0]);
    if (container) {
      console.log(chalk.green('     Stopping single container...'));
      execute(`docker rm -f ${container.name}`);
    } else {
      console.log(chalk.red(`     Could not find container ${args[0]}`));
    }
    return;
  }

  context.containers.forEach((container) => {
    const name = container.name;
    console.log('    Stopping ' + name);
    
    execute(`docker rm -f ${name}`);
  })

  console.log('');
};
