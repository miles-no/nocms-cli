const chalk = require('chalk');
const runContainer = require('../run_container');

module.exports = (context, localContainers) => {
  console.log('');
  console.log(chalk.green('     Starting containers...'));
  const isAllLocal = localContainers.length === 0 || (localContainers.length === 1 && localContainers[0] === 'all');
  const containerConfig = context.containers;
  for(let i = 0, l = containerConfig.length; i < l; ++i){
    runContainer(context, containerConfig[i], isAllLocal || localContainers.indexOf(containerConfig[i].name) > -1)
  }
  console.log('');
}
