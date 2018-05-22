module.exports = function adapter(remoteConfig) {
  const config = {
    cloud_name: remoteConfig.CLOUDINARY_CLOUD_NAME,
    api_key: remoteConfig.CLOUDINARY_API_KEY,
    api_secret: remoteConfig.CLOUDINARY_API_SECRET,
    logLevel: remoteConfig.LOG_LEVEL,
  };

  const encrypted = [
    // 'api_secret',
  ];

  return { config, encrypted };
};
