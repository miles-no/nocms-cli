module.exports = function adapter(remoteConfig) {
  const config = {
    logLevel: remoteConfig.LOG_LEVEL,
    userStore: remoteConfig.USERS,
  };

  const encrypted = [];

  return { config, encrypted };
};
