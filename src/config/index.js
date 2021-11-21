const responseTypes = require('./response-types');
require('dotenv').config();

module.exports = {
  env: process.env.env || 'development',
  port: process.env.PORT,
  isProd: process.env.NODE_ENV === 'production',
  responseTypes,
  corsConfig: {
    whitelist: process.env.CORS_WHITELIST.split(','),
    restrict: process.env.CORS_RESTRICT === 'true',
  },
  jwtConfig: {
    publicKey: process.env.JWT_PUBLIC_KEY.replace(/\\n/g, '\n'),
    privateKey: process.env.JWT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }
};
