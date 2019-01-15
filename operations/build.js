const execute = require('../helpers').execute;
const chalk = require('chalk');

const buildContainer = (context, container) => {
  if (container.isExternal || container.doNotBuild) {
    console.log(`       Skipping ${chalk.bold(container.name)}... (doNotBuild flag set)`);
    return;
  }

  const buildArgs = container.buildArgs ? container.buildArgs.map((buildArg) => {
    return `--build-arg ${buildArg.key}=${buildArg.value}`;
  }) : [];

  const target = `${context.root}/containers/${container.name}`;
  console.log(`       Building ${chalk.bold.yellow(container.name)} in ${chalk.bold.yellow(target)}`);
  const imageName = `${context.namespace}-${container.name}-local`;
  const dockerfile = `${target}/${container.dockerfile || 'Dockerfile.dev'}`;

  execute(`docker build ${buildArgs.join(' ')} -f ${dockerfile} -t ${imageName} ${target} `);
};

module.exports = (context, args) => {
  console.log('');
  console.log(chalk.green('     Building containers...'));

  let containersToBuild;
  if (args && args[0]) {
    containersToBuild = context.containers.filter((c) => { return c.name === args[0]; });
  } else {
    containersToBuild = context.containers.filter((c) => { return !c.isExternal; });
  }

  containersToBuild.forEach((c) => { return buildContainer(context, c); });

  console.log('');
  console.log(chalk.green('    ...done!'));
  console.log('');
};
