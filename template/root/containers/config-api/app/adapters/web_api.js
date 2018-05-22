module.exports = function adapter(remoteConfig) {
  const config = {
    logConfig: remoteConfig.LOG_CONFIG,
    cloudinaryHost: remoteConfig.WIDGET_API_CLOUDINARY_HOST,
    pageService: remoteConfig.PAGE_SERVICE,
    searchApi: remoteConfig.SEARCH_API_URI,
    searchApiSiteToIndex: remoteConfig.SEARCH_API_SITE_TO_INDEX,
    tokenSecret: remoteConfig.TOKEN_SECRET,
  };

  const encrypted = [
    'tokenSecret'
  ];

  return { config, encrypted };
};
