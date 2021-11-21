const jsonwebtoken = require('jsonwebtoken');

const { jwtConfig } = require('../config');

const issueJWT = (user) => {
  const { id } = user;

  const expiresIn = '1d';

  // TODO: Add role to payload
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, jwtConfig.privateKey, {
    expiresIn,
    algorithm: 'RS256',
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};

const verifyJWT = (jwt) =>
  jsonwebtoken.verify(jwt, jwtConfig.publicKey, { algorithms: ['RS256'] });

module.exports = { issueJWT, verifyJWT };
