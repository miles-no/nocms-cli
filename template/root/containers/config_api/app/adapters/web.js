module.exports = function adapter(remoteConfig) {
  const config = {
    debug: remoteConfig.MAIN_WEB_SERVER_DEBUG,
    logConfig: remoteConfig.LOG_CONFIG,
    environment: remoteConfig.MAIN_WEB_SERVER_ENVIRONMENT,
    adminTokenSecret: remoteConfig.TOKEN_SECRET,
    sites: remoteConfig.SITE_LIST,
    pageService: remoteConfig.MAIN_WEB_SERVER_PAGE_SERVICE,
    authenticationCookieName: remoteConfig.ADMIN_COOKIE_NAME,
    userCookieName: remoteConfig.MAIN_WEB_SERVER_USER_COOKIE_NAME,
    publisherLoginUrl: remoteConfig.PUBLISHER_LOGIN_URL,
    publisherLogoutUrl: remoteConfig.PUBLISHER_LOGOUT_URL,
    defaultSite: remoteConfig.DEFAULT_SITE, // TODO: Deprecated
    defaultLang: remoteConfig.DEFAULT_LANG, // TODO: Deprecated
    languageList: remoteConfig.I18N_LANGUAGES,
    googleAnalyticsId: remoteConfig.GOOGLE_ANALYTICS_ID,
    apps: {
      people: {
        officeResource: remoteConfig.PEOPLE_API_OFFICES,
        personResource: remoteConfig.PEOPLE_API_PERSON,
      },
      smiles: {
        officesResource: remoteConfig.SMILES_API_OFFICES,
        eventResource: remoteConfig.SMILES_API_EVENT,
        albumResource: remoteConfig.SMILES_API_ALBUM,
        instagramResource: remoteConfig.SMILES_API_INSTAGRAM,
      },
    },
    client: {
      messageApi: remoteConfig.MAIN_WEB_SERVER_MESSAGE_API,
      webApi: remoteConfig.MAIN_WEB_SERVER_WIDGET_API,
      imageApi: remoteConfig.MAIN_WEB_SERVER_WIDGET_API,
      cloudinaryCloudName: remoteConfig.CLOUDINARY_CLOUD_NAME,
      pdfFolders: remoteConfig.CLOUDINARY_PDF_FOLDERS,
      peopleApi: remoteConfig.PEOPLE_API_PERSON,
      publisherLoginUrl: remoteConfig.PUBLISHER_LOGIN_URL,
      tokenRefreshUrl: remoteConfig.TOKEN_REFRESH_URL,
      publisherLogoutUrl: remoteConfig.PUBLISHER_LOGOUT_URL,
      authenticationCookieName: remoteConfig.ADMIN_COOKIE_NAME,
      nocmsUserInfoCookieName: remoteConfig.ADMIN_INFO_COOKIE_NAME,
      userCookieName: remoteConfig.MAIN_WEB_SERVER_USER_COOKIE_NAME,
      pageTitlePostfix: remoteConfig.PAGE_TITLE_POSTFIX,
      googleAnalyticsId: remoteConfig.GOOGLE_ANALYTICS_ID,
    },
    i18nApi: remoteConfig.MAIN_WEB_SERVER_I18N_API,
    admin: {
      segments: remoteConfig.USER_SEGMENTS,
      enableABTesting: remoteConfig.ENABLE_AB_TESTING,
      sites: remoteConfig.SITE_LIST,
      lang: remoteConfig.ADMIN_LANG,
    },
    features: remoteConfig.FEATURES,
  };

  const encrypted = [
    'client.cloudinaryCloudName',
    'adminTokenSecret',
  ];

  return { config, encrypted };
};
