/* eslint global-require: off */
const env = process.env.NODE_ENV || 'development';

const pluginsDevelopment = [
  require('postcss-import'),
  require('postcss-url'),
  require('postcss-cssnext'),
  require('postcss-nested'),
];

const pluginsProduction = [
  require('postcss-import'),
  require('postcss-url'),
  require('postcss-cssnext'),
  require('postcss-nested'),
  require('cssnano')({
    preset: 'default',
  }),
];

module.exports = {
  plugins: env === 'production' ? pluginsProduction : pluginsDevelopment,
};
