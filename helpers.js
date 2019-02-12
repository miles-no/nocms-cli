const chalk = require('chalk');
const fs = require('fs');
const os = require('os');

const execSync = require('child_process').execSync;

const execute = (cmd) => {
  const isWin = process.platform === 'win32';
  if (isWin) {
    cmd = cmd.replace('&&', '&'); // eslint-disable-line
  }
  try {
    return execSync(cmd);
  } catch (ex) {
    console.warn(chalk.bold.red(`Command failed: ${cmd}`, ex.message));
    console.log(ex.stdout.toString('utf8'));
    return false;
  }
};

const getRuntimeEnv = () => {
  if (process.platform === 'linux') {
    try {
      if (fs.readFileSync('/proc/version', 'utf8').includes('Microsoft')) {
        return 'wsl';
      }
    } catch (err) {
      console.log(chalk.red(err));
    }

    return 'unix';
  }

  if (os.release().includes('Microsoft')) {
    return 'windows';
  }

  return false;
};

const getNormalizedPath = (p) => {
  let normalizedPath = p;
  const runtimeEnv = getRuntimeEnv();

  console.log(`Runtime Env: ${runtimeEnv}`);

  if (runtimeEnv === 'wsl') {
    normalizedPath = execute(`/bin/wslpath -m ${p}`);
  }

  console.log(`Normalized Path: ${p} => ${normalizedPath}`);

  return normalizedPath.toString().trim();
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

const getFileContents = (file) => {
  try {
    return fs.readFileSync(file);
  } catch (ex) {
    return false;
  }
};

module.exports = {
  execute,
  getArgs,
  fit,
  getImageName,
  getNormalizedPath,
  getRuntimeEnv,
  getFileContents,
};
