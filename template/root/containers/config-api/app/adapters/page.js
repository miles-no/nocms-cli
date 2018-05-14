module.exports = function adapter(remoteConfig) {
  const config = {
    namespace: remoteConfig.NAMESPACE,
    db: {
      type: remoteConfig.PAGE_DATABASE,
      host: remoteConfig.PAGE_DATABASE_HOST,
    },
    databaseUrl: `${remoteConfig.DATABASE_HOST}/${remoteConfig.NAMESPACE}-${remoteConfig.PAGE_DATABASE_INDEX}`,
    hosts: {
      varnish: remoteConfig.VARNISH_HOST,
    },
    mq: {
      host: remoteConfig.RABBIT_MQ_HOST,
      login: remoteConfig.RABBIT_MQ_LOGIN,
      password: remoteConfig.RABBIT_MQ_PASSWORD,
      vhost: remoteConfig.RABBIT_MQ_VHOST,
      exchange: remoteConfig.RABBIT_MQ_EXCHANGE_NAME,
      queue: remoteConfig.PAGE_RABBIT_MQ_QUEUE,
      heartbeat: remoteConfig.RABBIT_MQ_HEARTBEAT,
    },
    adminTokenSecret: remoteConfig.TOKEN_SECRET,
    logConfig: remoteConfig.LOG_CONFIG,
  };

  const encrypted = [
    'mq.login',
    'mq.password',
    'adminTokenSecret',
  ];

  return { config, encrypted };
};
