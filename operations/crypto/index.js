const chalk = require('chalk');
const AES256 = require('./algorithms/aes256');

module.exports = {
  encrypt: (context, args) => {
    const algo = new AES256();
    const key = args[1] || process.env.CRYPTEX_KEYSOURCE_PLAINTEXT_KEY;
    if (!key) {
      console.log('');
      console.log(chalk.red('Could not find key. Please provide a key using final argument, or make sure the environment variable "CRYPTEX_KEYSOURCE_PLAINTEXT_KEY" is set.'))
      console.log('');
      return;
    }

    console.log('');
    console.log(`Encrypting value using key from ${args[1] ? 'argument': 'environment variable "CRYPTEX_KEYSOURCE_PLAINTEXT_KEY"'}`);
    console.log('');
    console.log(`Encrypted value:      ${chalk.bold.yellow(algo.encrypt(key, args[0]))}`);
    console.log('');
  },
  decrypt: (context, args) => {
    const algo = new AES256();
    const key = args[1] || process.env.CRYPTEX_KEYSOURCE_PLAINTEXT_KEY;
    if (!key) {
      console.log('');
      console.log(chalk.red('Could not find key. Please provide a key using final argument, or make sure the environment variable "CRYPTEX_KEYSOURCE_PLAINTEXT_KEY" is set.'))
      console.log('');
      return;
    }

    console.log('');
    console.log(`Decrypting value using key from ${args[1] ? 'argument': 'environment variable "CRYPTEX_KEYSOURCE_PLAINTEXT_KEY"'}`);
    console.log('');
    console.log(`Decrypted value:      ${chalk.bold.yellow(algo.decrypt(key, args[0]))}`);
    console.log('');
  }
};
