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
  console.log('     **** TODO ****');
  // return;
  console.log('     * init [-P]                 : ' + chalk.grey('Will clone all the repositories into the containers, packages and\n                                   databases folders, create a docker network and create docker data\n                                   volumes. Keep in mind that the docker daemon should be started before\n                                   running this operation.  Packages will be skipped unless -P flag is set.'));
  console.log('     * update [-P]               : ' + chalk.grey('Will pull or clone repositories, install npm packages and build the containers. Packages will be skipped unless -P flag is set.'));
  console.log('     * pull [-P]                 : ' + chalk.grey('Will pull all the repositories. Packages will be skipped unless -P flag is set.'));
  console.log('     * pullImages                : ' + chalk.grey('Will pull all images from docker registry.'));
  console.log('     * encrypt <string> [secret] : ' + chalk.grey('Will encrypt a value using env var CRYPTEX_KEYSOURCE_PLAINTEXT_KEY or last argument.\n                                   Use for storing secret values in config api.'));
  console.log('     * decrypt <value> [secret]  : ' + chalk.grey('Will decrypt a value using env var CRYPTEX_KEYSOURCE_PLAINTEXT_KEY or last argument.\n                                   Use for storing secret values in config api.'));
  console.log('     * one <container> [local]   : ' + chalk.grey('Will start a single container either locally or from registry.'));
  console.log('     * build                     : ' + chalk.grey('Will build all the docker containers in the containers folder.'));
  console.log('     * createVolumes             : ' + chalk.grey('Will create docker data volume containers for elasticsearch and couchbase.'));
  console.log('     * install [-P]              : ' + chalk.grey('Installs the repository\'s NPM package dependencies. Packages will be skipped unless -P flag is set.'));
  console.log('     * start [local...]          : ' + chalk.grey('Starts all containers. Containers not listed in local are run in production mode'));
  console.log('     * cd <folder>               : ' + chalk.grey('Searches through packages and containers and outputs the absolute folder path. Can be used with "cd `nocms cd <folder>`"'));
  console.log('');
};
