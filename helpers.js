'use strict';
const chalk = require('chalk');

const execSync = require('child_process').execSync;

const execute = (cmd, cb) => {
  try{
    return execSync(cmd);
  } catch(ex) {
    console.warn(chalk.bold.red(`Command failed: ${cmd}`, ex.message));
    console.log(ex.stdout.toString('utf8'));
    return false;
  }
};

const getArgs = () => {
  const args = process.argv;
  const isCliMode = !(/.*[\/\\]node(|\.exe)$/.test(args[0]));

  for(var i = 0, l = args.length; i < l; ++i) {
    if(args[i].indexOf("nocms") != -1) {
      return {
        operation: args[i + 1],
        options: args.slice(i + 2)
      };
    }
  }

  console.warn(chalk.bold.red('Unable to locate nocms argument'));
};

const format = (str, opts) => {
  let spaces = '                                                                                       ';
  let result = '';
  if (opts.indent > 0) {
    result += spaces.substring(0, opts.indent);
  }
  if (opts.fit > 0) {
    result += (str + spaces).substring(0, opts.fit);
  } else {
    result += str;
  }
  return result;
};

const fit = (str, size) => {
  let spaces = '                                                                                       ';
  return (str + spaces).substring(0, size);
};

const getImageName = (container, runLocal) => {
  if(runLocal){
    if(container.localImage){
      return container.localImage;
    }
    if(container.isExternal){
      return container.name;
    }
    return container.name + '_dev';
  }
  return container.image;
};

module.exports = {
  execute,
  getArgs,
  fit,
  getImageName,
};
