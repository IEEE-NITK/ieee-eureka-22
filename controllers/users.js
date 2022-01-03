const User = require('../models/user');
const passport = require('passport');

module.exports.renderRegister = (req, res) => {
  res.render('users/register');
};

module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to IEEE-Eureka');
      delete req.session.returnTo;
      res.redirect('/home');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLogin = (req, res) => {
  res.render('users/login');
};

module.exports.loginUser = (req, res) => {
  req.flash('success', 'Welcome Back');
  const redirectUrl = req.session.returnTo || '/home';
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout();
  res.redirect('/');
};
