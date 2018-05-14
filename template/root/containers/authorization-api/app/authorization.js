const config = require('nocms-config-client').get();

const getClaims = (userId, userStore = []) => {
  const user = userStore.find(usr => usr.userId === userId);
  return user ? user.claims : {};
};

module.exports = ({
  getClaims: userId => getClaims(userId, config.userStore),
});
