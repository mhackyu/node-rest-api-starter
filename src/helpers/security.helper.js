const jsonwebtoken = require('jsonwebtoken');

const { jwtConfig } = require('../config');

const issueJWT = (user) => {
  const { id, role } = user;

  const expiresIn = '1d';

  const payload = {
    sub: id,
    role,
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
