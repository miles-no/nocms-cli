module.exports = function adapter(remoteConfig) {
  const config = {
    logConfig: remoteConfig.LOG_CONFIG,
    adminTokenSecret: remoteConfig.TOKEN_SECRET,
    sites: remoteConfig.SITE_LIST,
    defaultSite: remoteConfig.DEFAULT_SITE,
    defaultLang: remoteConfig.DEFAULT_LANG,
    pageService: remoteConfig.PAGE_SERVICE,
    authenticationCookieName: remoteConfig.AUTHENTICATION_COOKIE_NAME,
    userCookieName: remoteConfig.USER_COOKIE_NAME,
    publisherLoginUrl: remoteConfig.PUBLISHER_LOGIN_URL,
    publisherLogoutUrl: remoteConfig.PUBLISHER_LOGOUT_URL,
    languageList: remoteConfig.I18N_LANGUAGES,
    client: {
      messageApi: remoteConfig.MESSAGE_API_ENDPOINT,
      webApi: remoteConfig.WEB_API_ENDPOINT,
      imageApi: remoteConfig.IMAGE_API_ENDPOINT,
      cloudinaryCloudName: remoteConfig.CLOUDINARY_CLOUD_NAME,
      pdfFolders: remoteConfig.CLOUDINARY_PDF_FOLDERS,
      publisherLoginUrl: remoteConfig.PUBLISHER_LOGIN_URL,
      tokenRefreshUrl: remoteConfig.TOKEN_REFRESH_URL,
      publisherLogoutUrl: remoteConfig.PUBLISHER_LOGOUT_URL,
      authenticationCookieName: remoteConfig.AUTHENTICATION_COOKIE_NAME,
      nocmsUserInfoCookieName: remoteConfig.NOCMS_USER_INFO_COOKIE_NAME,
      userCookieName: remoteConfig.USER_COOKIE_NAME,
    },
    i18nApi: remoteConfig.I18N_API,
    admin: {
      sites: remoteConfig.SITE_LIST,
      lang: remoteConfig.ADMIN_LANG,
    },
  };

  const encrypted = [
    'adminTokenSecret',
  ];

  return { config, encrypted };
};
