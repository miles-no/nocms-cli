module.exports = function adapter(remoteConfig) {
  const config = {
    logConfig: remoteConfig.LOG_CONFIG,
    cloudinaryHost: remoteConfig.WIDGET_API_CLOUDINARY_HOST,
    pageService: remoteConfig.PAGE_SERVICE,
    tokenSecret: remoteConfig.TOKEN_SECRET,
  };

  const encrypted = [
    'tokenSecret'
  ];

  return { config, encrypted };
};
