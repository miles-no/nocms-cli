const fs = require('fs');

const getFileContents = (file) => {
  try {
    return fs.readFileSync(file);
  } catch (ex) {
    return false;
  }
};

module.exports = function getContext() {
  const cwd = process.cwd();
  const parentFolders = cwd.split('/');
  let config = {};

  while (parentFolders.length > 0) {
    let currentFile = `${parentFolders.join('/')}/nocms.conf.json`;
    let contents;
    let isJson = true;

    contents = getFileContents(currentFile);
    if (!contents) {
      currentFile = `${parentFolders.join('/')}/nocms.conf.js`;
      contents = getFileContents(currentFile);
      isJson = false;
    }

    if (!contents) {
      currentFile = `${parentFolders.join('/')}/setup/nocms.conf.js`;
      contents = getFileContents(currentFile);
      isJson = false;
    }

    if (!contents) {
      currentFile = `${parentFolders.join('/')}/setup/nocms.conf.json`;
      contents = getFileContents(currentFile);
    }

    if (!contents) {
      parentFolders.pop();
      continue;
    }

    if (isJson) {
      try {
        config = JSON.parse(contents);
      } catch (ex) {
        throw new Error(`Could not parse ${currentFile}`);
      }
    } else {
      config = require(currentFile); // eslint-disable-line
    }

    config.root = parentFolders.join('/');
    config.contextFile = currentFile;
    return config;
  }

  throw new Error('Could not find nocms.conf');
};
