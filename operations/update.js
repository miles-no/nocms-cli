const execute = require('../helpers').execute;
const chalk = require('chalk');
const npmInstall = require('./install');
const build = require('./build');

const bitbucket = 'git@bitbucket.org:nocms'
const github = 'git@github.com:miles-no';

const pullRepo = (context, container) => {
  const target = `${context.root}/containers/${container.name}`;

  console.log(`       Pulling ${container.name} in ${target}`);
  console.log(execute(`cd ${target} && git pull --rebase`));
};

const cloneRepo = (context, container) => {
  const target = `${context.root}/containers/${container.name}`;
  try{
    fs.accessSync(target);
    pullRepo(context, container);
  }catch(ex){
    console.log(`       Cloning ${container.name}...`);
    execute(`git clone ${container.repo} ${target}`);
  }
};

module.exports = (context, args) => {
  console.log('');
  console.log(chalk.green('     Cloning or updating containers...'));  

  if (args && args[0]) {
    const c = context.containers.find((c) => c.name === args[0]);
    if (!c) {
      console.log(chalk.red(`Could not find container ${args[0]}`));
      return;
    }
    if (!c.repo) {
      console.log(chalk.red(`The container ${args[0]} has no repo field`));
      return;
    }

    if (c.isExternal) {
      console.log(chalk.red(`The container ${args[0]} is external`));
      return;
    }

    try {
      cloneRepo(context, c);
    } catch(ex){
      console.log(ex);
    }
  }
  context.containers.filter((c) => c.repo && !c.isExternal).forEach((c) => {
    try {
      cloneRepo(context, c);
    } catch(ex){
      console.log(ex);
    }
  });

  npmInstall(context, args);
  build(context, args);
}
