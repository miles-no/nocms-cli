module.exports = function adapter(remoteConfig) {
  const config = {
    sites: remoteConfig.SITE_LIST,
    logConfig: remoteConfig.LOG_CONFIG,
  };

  const encrypted = [];

  return { config, encrypted };
};
