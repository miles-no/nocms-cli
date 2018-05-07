const chalk = require('chalk');
const helpers = require('../helpers');
const terminalLink = require('terminal-link');

const indent = 4;

const printNotFound = () => {
  console.log(`     ${chalk.bold.yellow('No context found for')} ${chalk.bold(process.cwd())}.`);
  console.log('     Make sure you have a nocms.conf.json or nocms.conf.js in your project root folder.')
};

module.exports = {
  summary: (context) => {

    console.log('');

    if (!context) {
      printNotFound();
      return;
    }
    
    console.log(`    Context file:     ${chalk.bold.yellow(context.contextFile)}`);
    console.log(`    Namespace:        ${chalk.bold.yellow(context.namespace)}`);
    if (context.environments) {
      if (context.environments.dev) {
        console.log(`    Dev environment:  ${chalk.bold.yellow(terminalLink(context.environments.dev, context.environments.dev, { fallback: (text, url) => { return url; } })) }`);
      }
      if (context.environments.test) {
        console.log(`    Test environment: ${chalk.bold.yellow(terminalLink(context.environments.test, context.environments.test, { fallback: (text, url) => { return url; } })) }`);
      }
      if (context.environments.prod) {
        console.log(`    Prod environment: ${chalk.bold.yellow(terminalLink(context.environments.prod, context.environments.prod, { fallback: (text, url) => { return url; } })) }`);
      }
    }
    
  },
  details: (context) => {
    // console.log(context);
    console.log(`    Network:          ${chalk.bold.yellow(`${context.namespace} (${context.network})`)}`);
    console.log('');
    console.log(`    ${chalk.bold.green('Containers')}`);
    console.log('');
    context.containers.forEach((container) => {
      const name = container.name;
      
      let portLinks = (container.ports || [])
        .map((portMap) => {
          const port = portMap.substring(0, portMap.indexOf(':'));
          return `${terminalLink(port, `http://localhost:${port}`)}`;
        })
        .join(', ');
      
        console.log(`      ${helpers.fit(container.name, 20)} ${portLinks}`);
    });
  },
};
