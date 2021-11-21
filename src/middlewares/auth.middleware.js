const passport = require('passport');

const authenticate =
  // eslint-disable-next-line no-unused-vars
  (rolesNeeded = ['user']) =>
  (req, res, next) => {
    // TODO: Add role validation here if needed
    // console.log(rolesNeeded);
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.error('UNAUTHORIZED');
      req.user = user;
      return next();
    })(req, res, next);
  };

module.exports = { authenticate };
