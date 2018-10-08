const execute = require('../helpers').execute;
const chalk = require('chalk');

const prompt = require('prompt');
const fs = require('fs');
const build = require('./build');
const init = require('./init');
const install = require('./install');

const getNetwork = (portRange) => {
  const match = portRange.match(/^(\d{2,3})00$/);
  const ipPart = parseInt(match[1], 10);
  if (ipPart < 256) {
    return `172.16.${ipPart}.0/24`;
  }
  if (ipPart < 512) {
    return `172.17.${ipPart - 256}.0/24`;
  }
  return `172.18.${ipPart - 512}.0/24`;
};

const getPort = (range, port) => {
  return range.replace(/00$/, `00${port}`.substr(-2));
};

module.exports = (context) => {
  const filesInCwd = fs.readdirSync(process.cwd());

  console.log('');

  if (filesInCwd.length !== 0) {
    console.log(chalk.red('    You need to call create from an empty folder.'));
    return;
  }

  if (context) {
    console.log(chalk.red(`    Context found at ${context.contextFile}. Please create project in some other folder.`));
    return;
  }

  prompt.start();

  const boolMap = {
    yes: true,
    y: true,
    no: false,
    n: false,
  };

  const boolValues = [
    'yes', 'y', 'no', 'n',
  ];

  const inputSchema = {
    properties: {
      namespace: {
        pattern: /^[a-z-]+$/,
        message: 'Namespace must only contain lowercase letters a-z and -',
        required: true,
      },
      optionI18n: {
        description: 'Do you need multi language support?',
        type: 'string',
        conform(value) {
          return boolValues.indexOf(value) >= 0;
        },
        before: (value) => {
          return boolMap[value];
        },
      },
      optionFragments: {
        description: 'Do you need a seperate fragment service?',
        type: 'string',
        conform(value) {
          return boolValues.indexOf(value) >= 0;
        },
        before: (value) => {
          return boolMap[value];
        },
      },
      optionsCloudinary: {
        description: 'Do you want to use cloudinary photo service?',
        type: 'string',
        conform(value) {
          return boolValues.indexOf(value) >= 0;
        },
        before: (value) => {
          return boolMap[value];
        },
      },
      optionsWebApi: {
        description: 'Do you want to have a generic web api container?',
        type: 'string',
        conform(value) {
          return boolValues.indexOf(value) >= 0;
        },
        before: (value) => {
          return boolMap[value];
        },
      },
      optionsSearchApi: {
        description: 'Do you want a search api?',
        type: 'string',
        conform(value) {
          return boolValues.indexOf(value) >= 0;
        },
        before: (value) => {
          return boolMap[value];
        },
      },
      dockerRegistry: {
        default: 'miles-nocms.jfrog.io',
        type: 'string',
      },
      portRange: {
        description: 'Port range start, whole hundreds > 1100',
        type: 'string',
        conform: (value) => {
          return /^\d{2,3}00$/.test(value) && value > '1100';
        },
      },
    },
  };

  prompt.get(inputSchema, (err, result) => {
    const defaultContainers = [
      {
        name: 'rabbitmq',
        image: 'rabbitmq:3.6.2-management',
        flags: ['-e HOSTNAME=rabbitmq'],
        isExternal: true,
      },
      {
        name: 'elasticsearch',
        image: 'docker.elastic.co/elasticsearch/elasticsearch-oss:6.1.0',
        flags: ['--user=0', '-e ES_JAVA_OPTS=\'-Xms512m -Xmx512m\''],
        ports: [`${getPort(result.portRange, 50)}:9200`, `${getPort(result.portRange, 51)}:9300`],
        isExternal: true,
        volumes: [`esdata-${result.namespace}:/usr/share/elasticsearch/data`],
      },
      {
        name: 'config-api',
        image: `${result.dockerRegistry}/${result.namespace}_config_api`,
        ports: [`${getPort(result.portRange, 4)}:3000`],
      },
      {
        name: 'page-service',
        image: `${result.dockerRegistry}/page_service`,
        ports: [`${getPort(result.portRange, 2)}:3000`],
        isExternal: true,
      },
      {
        name: 'web',
        image: `${result.dockerRegistry}/${result.namespace}_web`,
        ports: [`${getPort(result.portRange, 1)}:3000`],
      },
      {
        name: 'message-api',
        image: `${result.dockerRegistry}/message_api`,
        ports: [`${getPort(result.portRange, 3)}:3000`],
        isExternal: true,
      },
      {
        name: 'authentication-api',
        image: `${result.dockerRegistry}/authentication_api`,
        ports: [`${getPort(result.portRange, 5)}:3000`],
        isExternal: true,
      },
      {
        name: 'authorization-api',
        image: `${result.dockerRegistry}/${result.namespace}_authorization_api`,
        ports: [`${getPort(result.portRange, 6)}:3000`],
      },
    ];
    const optionalContainers = [];
    const lastContainers = [
      {
        name: 'varnish',
        image: `${result.dockerRegistry}/${result.namespace}_varnish`,
        flags: ['-e VCL_PATH="/config/varnish.vcl"', '-e VARNISH_OPTS="-p feature=+esi_disable_xml_check -p default_ttl=30"'],
        dockerfile: 'Dockerfile',
        ports: [`${getPort(result.portRange, '00')}:80`],
      },
    ];

    if (result.optionI18n) {
      optionalContainers.push({
        name: 'i18n-api',
        image: `${result.dockerRegistry}/i18n_api`,
        ports: [`${getPort(result.portRange, 20)}:3000`],
        isExternal: true,
      });
    }

    if (result.optionFragments) {
      optionalContainers.push({
        name: 'fragments',
        image: `${result.dockerRegistry}/${result.namespace}_fragment_api`,
        ports: [`${getPort(result.portRange, 21)}:3000`],
      });
    }

    if (result.optionsCloudinary) {
      optionalContainers.push({
        name: 'cloudinary',
        image: `${result.dockerRegistry}/cloudinary`,
        ports: [`${getPort(result.portRange, 22)}:3000`],
        isExternal: true,
      });
    }

    if (result.optionsWebApi) {
      optionalContainers.push({
        name: 'web-api',
        image: `${result.dockerRegistry}/${result.namespace}_web_api`,
        ports: [`${getPort(result.portRange, 23)}:3000`],
      });
    }

    if (result.optionsSearchApi) {
      optionalContainers.push({
        name: 'search-api',
        image: `${result.dockerRegistry}/search_api`,
        ports: [`${getPort(result.portRange, 24)}:3000`],
        isExternal: true,
      });
    }

    const conf = {
      namespace: result.namespace,
      network: getNetwork(result.portRange),
      environments: {
        dev: `http://localhost:${getPort(result.portRange, 23)}`,
      },
      containers: defaultContainers.concat(optionalContainers).concat(lastContainers),
    };

    fs.writeFileSync('./nocms.conf.json', JSON.stringify(conf, null, '  '));

    const gruntInitCmd = `node ${__dirname}/../node_modules/grunt-init/bin/grunt-init --force ${__dirname}/../template`;

    const gruntInitResult = execute(gruntInitCmd);

    console.log(gruntInitResult.toString('utf8'));
    conf.root = process.cwd();
    conf.currentFile = `${conf.root}/nocms.conf.json`;

    init(conf);
    build(conf);
    install(conf);
  });
};
