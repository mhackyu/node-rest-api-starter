const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');

const { jwtConfig } = require('../../config');

const prisma = new PrismaClient();

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: '',
//   issuer: '',
//   audience: '',
//   algorithms: ['RS256'],
//   ignoreExpiration: false,
//   passReqCallback: false,
//   jsonWebTokenOptions: {
//     complete: false,
//     clockTolerance: '',
//     maxAge: '2d',
//     clockTimestamp: '100',
//     nonce: 'string here for OpenID',
//   },
// };

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.publicKey,
  algorithms: ['RS256'],
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  const { sub } = payload;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: sub,
      },
    });

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(strategy);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

module.exports = passport;
