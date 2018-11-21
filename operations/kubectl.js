const execute = require('../helpers').execute;
const chalk = require('chalk');

module.exports = (context, args) => {
  console.log('');
  console.log(chalk.green('     Setting kubectl...'));
  let env = 'default';
  if (args && args[0]) {
    env = args[0];
  }

  const kubectlContext = context.kubectl[env].context;
  const kubectlNamespace = context.kubectl[env].namespace;
  console.log(chalk.green(`     Setting kubectl context ${kubectlContext}`));
  execute(`kubectl config use-context ${kubectlContext}`);

  console.log(chalk.green(`     Setting kubectl namespace ${kubectlNamespace}`));
  execute(`kubectl config set-context ${kubectlContext} --namespace=${kubectlNamespace}`);

  console.log('');
};
