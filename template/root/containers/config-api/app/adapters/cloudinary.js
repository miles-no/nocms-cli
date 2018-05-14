module.exports = function adapter(remoteConfig) {
  const config = {
    cloudName: remoteConfig.CLOUDINARY_CLOUD_NAME,
    apiKey: remoteConfig.CLOUDINARY_API_KEY,
    apiSecret: remoteConfig.CLOUDINARY_API_SECRET,
    logLevel: remoteConfig.LOG_LEVEL,
  };

  const encrypted = [];

  return { config, encrypted };
};
