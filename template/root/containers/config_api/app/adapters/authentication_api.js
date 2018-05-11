module.exports = function adapter(remoteConfig) {
  const config = {
    sites: remoteConfig.SITE_LIST,
    transferProtocol: remoteConfig.TRANSFER_PROTOCOL,
    tokenSecret: remoteConfig.TOKEN_SECRET,
    logConfig: remoteConfig.LOG_CONFIG,
    auth0Domain: remoteConfig.ADMIN_AUTH0_DOMAIN,
    auth0ClientSecret: remoteConfig.ADMIN_AUTH0_CLIENT_SECRET,
    auth0ClientId: remoteConfig.ADMIN_AUTH0_CLIENT_ID,
    auth0Scopes: remoteConfig.AUTH0_SCOPES,
    auth0CallbackUrl: remoteConfig.AUTH0_CALLBACK_URL,
    secureCookie: remoteConfig.ADMIN_USE_SECURE_COOKIE,
    authenticationCookieName: remoteConfig.ADMIN_COOKIE_NAME,
    adminInfoCookieName: remoteConfig.ADMIN_INFO_COOKIE_NAME,
    authorizationApi: remoteConfig.AUTHORIZATION_API,
    tokenTtl: remoteConfig.AUTHORIZATION_TOKEN_TTL,
    reauthTokenTtl: remoteConfig.AUTHORIZATION_REAUTH_TOKEN_TTL,
    cookieTtl: remoteConfig.AUTHORIZATION_COOKIE_TTL,
  };

  const encrypted = [
    'auth0ClientSecret',
    'tokenSecret',
  ];

  return { config, encrypted };
};
