module.exports = function adapter(remoteConfig) {
  const config = {
    namespace: remoteConfig.NAMESPACE,
    db: {
      type: remoteConfig.I18N_API_DATABASE,
      host: remoteConfig.I18N_API_DATABASE_HOST,
    },
    logConfig: remoteConfig.LOG_CONFIG,
    languages: remoteConfig.I18N_LANGUAGES,
    tokenSecret: remoteConfig.TOKEN_SECRET,
    databaseUrl: `${remoteConfig.DATABASE_HOST}/${remoteConfig.NAMESPACE}-${remoteConfig.I18N_DATABASE_INDEX}`,
  };

  const encrypted = [
    'tokenSecret',
  ];

  return { config, encrypted };
};
