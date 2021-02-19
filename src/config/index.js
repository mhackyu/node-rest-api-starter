const responseTypes = require('./response-types');
require('dotenv').config();

module.exports = {
  env: process.env.env || 'development',
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === 'production',
  app: {
    title: process.env.APP_TITLE || 'Untitled',
    description: process.env.APP_DESCRIPTION || 'No description provided',
    version: process.env.APP_VERSION || 'No description provided',
    domain: process.env.APP_DOMAIN || 'http://localhost',
  },
  db: {
    client: process.env.DB_CLIENT || 'pg',
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || 'db_default',
    port: process.env.DB_PORT || '5432',
    sslKey: process.env.DB_SSL_KEY,
  },
  responseTypes,
  corsConfig: {
    whitelist: process.env.CORS_WHITELIST.split(','),
    restrict: process.env.CORS_RESTRICT === 'true',
  },
};
