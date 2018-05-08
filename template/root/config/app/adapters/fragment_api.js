module.exports = function adapter(remoteConfig) {
  const config = {
    sites: remoteConfig.SITE_LIST,
    pageServiceUrl: remoteConfig.SERVICES.page,
    logConfig: remoteConfig.LOG_CONFIG,
  };

  const encrypted = [];

  return { config, encrypted };
};
