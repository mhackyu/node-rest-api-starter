const passport = require('passport');

const authenticate =
  // eslint-disable-next-line no-unused-vars
  (rolesNeeded = ['USER']) =>
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.error('UNAUTHORIZED');
      if (!rolesNeeded.includes(user.role)) return res.error('FORBIDDEN');

      req.user = user;
      return next();
    })(req, res, next);
  };

module.exports = { authenticate };
