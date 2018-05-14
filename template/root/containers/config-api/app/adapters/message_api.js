module.exports = function adapter(remoteConfig) {
  const config = {
    mq: {
      host: remoteConfig.RABBIT_MQ_HOST,
      login: remoteConfig.RABBIT_MQ_LOGIN,
      password: remoteConfig.RABBIT_MQ_PASSWORD,
      vhost: remoteConfig.RABBIT_MQ_VHOST,
      exchange: remoteConfig.RABBIT_MQ_EXCHANGE_NAME,
      queue: remoteConfig.MESSAGE_API_RABBIT_MQ_QUEUE,
    },
    logConfig: remoteConfig.LOG_CONFIG,
  };

  const encrypted = [
    'mq.login',
    'mq.password',
  ];

  return { config, encrypted };
};
