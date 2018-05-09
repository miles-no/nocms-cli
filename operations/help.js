const chalk = require('chalk');

module.exports = () => {
  console.log('');
  console.log('     Use this cli to perform operations on the collection of repositories in the ')
  console.log('     nocms boilerplate.');
  console.log('');
  console.log('     ' + chalk.bold.green('Usage: ') + 'nocms <command> [options...]');
  console.log('');
  console.log('     ' + chalk.bold.green('Available operations are:'));
  console.log('');
  console.log('     * create                    : ' + chalk.grey('Will start a generator for setting up a NoCMS project from scratch. Make sure you run it from an empty directory.'));
  console.log('     * init                      : ' + chalk.grey('Will create the docker network for the current namespace and create volumes for containers listed in context.'));
  console.log('     * encrypt <string> [secret] : ' + chalk.grey('Will encrypt a value using env var CRYPTEX_KEYSOURCE_PLAINTEXT_KEY or last argument.\n                                   Use for storing secret values in config api.'));
  console.log('     * decrypt <value> [secret]  : ' + chalk.grey('Will decrypt a value using env var CRYPTEX_KEYSOURCE_PLAINTEXT_KEY or last argument.\n                                   Use for storing secret values in config api.'));
  console.log('     * build [container]         : ' + chalk.grey('Will build all the docker containers listed in context. If container argument is \n                                   specified only the identified container is built.'));
  console.log('     * install                   : ' + chalk.grey('Installs the containers\'s NPM package dependencies.'));
  console.log('TODO * update                    : ' + chalk.grey('Will pull or clone repositories, install npm packages and build the containers.'));
  console.log('     * start [container]         : ' + chalk.grey('Starts all containers in the order specified in the project context. If container argument\n                                   is specified only the identified container is started.'));
  console.log('     * stop [container]          : ' + chalk.grey('Stops all containers. If container argument is specified only the identified container is stopped.'));
  console.log('');
};
