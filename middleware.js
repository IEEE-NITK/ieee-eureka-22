const ExpressError = require('./utils/ExpressError');
const { stoneSchema } = require('./schemas');

module.exports.isLoggedIn = function (req, res, next) {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    req.flash('error', 'you must be signed in');
    return res.redirect('/login');
  }
  next();
};
module.exports.validateStone = (req, res, next) => {
  const { error } = stoneSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
