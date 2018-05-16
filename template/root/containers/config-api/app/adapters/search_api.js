module.exports = function adapter(remoteConfig) {
  const config = {
    logConfig: remoteConfig.LOG_CONFIG,
    databaseUrl: `${remoteConfig.DATABASE_HOST}/${remoteConfig.NAMESPACE}-${remoteConfig.SEARCH_API_DATABASE_INDEX}`,
    mq: {
      host: remoteConfig.RABBIT_MQ_HOST,
      login: remoteConfig.RABBIT_MQ_LOGIN,
      password: remoteConfig.RABBIT_MQ_PASSWORD,
      vhost: remoteConfig.RABBIT_MQ_VHOST,
      exchange: remoteConfig.RABBIT_MQ_EXCHANGE_NAME,
      queue: remoteConfig.SEARCH_API_RABBIT_MQ_QUEUE,
    },
    crawler: {
      site: remoteConfig.SEARCH_API_SITE_TO_INDEX,
      paths: remoteConfig.SEARCH_API_CRAWLER_PATHS,
      options: {
        followLinks: remoteConfig.SEARCH_API_CRAWLER_FOLLOW_LINKS,
        contentSelector: remoteConfig.SEARCH_API_CRAWLER_CONTENT_SELECTOR,
      },
    },
  };

  const encrypted = [
    'mq.login',
    'mq.password',
  ];

  return { config, encrypted };
};
