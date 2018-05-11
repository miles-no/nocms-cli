module.exports = function adapter(remoteConfig) {
  const config = {
    logConfig: remoteConfig.LOG_CONFIG,
    cloudinaryHost: remoteConfig.WIDGET_API_CLOUDINARY_HOST,
  };

  const encrypted = [];

  return { config, encrypted };
};
