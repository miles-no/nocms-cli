#!/usr/bin/env node

const helpers = require('./helpers');
const chalk = require('chalk');
const getContext = require('./get_context');
const operationHandlers = require('./operations');
const printContext = require('./operations/print_context');

let context;

const args = helpers.getArgs();
const operation = args.operation || 'context';

if (operation !== 'version' || operation !== 'help') {
  try {
    context = getContext();

    if (operation !== 'create') {
      printContext.summary(context);
    }
  } catch (ex) {
    context = false;
  }
}

if (!operationHandlers[operation]) {
  console.log(chalk.yellow(`Invalid argument, "${operation}". Should be one of [help, context, init, build, pull, install, start, stop, encrypt, decrypt, version]`));
  process.exit(9);
}

operationHandlers[operation](context, args.options);
