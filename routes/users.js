const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');

const { validateUser } = require('../middleware');
router
  .route('/register')
  .get(users.renderRegister)
  .post(catchAsync(users.createUser));

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    validateUser,
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.loginUser,
  );

router.get('/logout', users.logoutUser);

module.exports = router;
