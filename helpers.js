const chalk = require('chalk');

const execSync = require('child_process').execSync;

const execute = (cmd) => {
  try {
    return execSync(cmd);
  } catch (ex) {
    console.warn(chalk.bold.red(`Command failed: ${cmd}`, ex.message));
    console.log(ex.stdout.toString('utf8'));
    return false;
  }
};

const getArgs = () => {
  const args = process.argv;

  for (let i = 0, l = args.length; i < l; ++i) {
    if (args[i].indexOf('nocms') !== -1) {
      return {
        operation: args[i + 1],
        options: args.slice(i + 2),
      };
    }
  }

  console.warn(chalk.bold.red('Unable to locate nocms argument'));
  return null;
};

const fit = (str, size) => {
  const spaces = '                                                                                       ';
  return (str + spaces).substring(0, size);
};

const getImageName = (container, runLocal) => {
  if (runLocal) {
    if (container.localImage) {
      return container.localImage;
    }
    if (container.isExternal) {
      return container.name;
    }
    return `${container.name}_dev`;
  }
  return container.image;
};

module.exports = {
  execute,
  getArgs,
  fit,
  getImageName,
};
