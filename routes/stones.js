const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const stones = require('../controllers/stones');
const { isLoggedIn, isAdmin, validateSolution } = require('../middleware');

router
  .route('/')
  .get(isLoggedIn, catchAsync(stones.index))
  .post(isLoggedIn, catchAsync(stones.postAnswer));
router.get('/leaderboard', catchAsync(stones.leaderBoard));

router
  .route('/new')
  .get(isLoggedIn, isAdmin, catchAsync(stones.renderNewForm))
  .post(isLoggedIn, isAdmin, catchAsync(stones.createStone));

router
  .route('/:id')
  .post(isLoggedIn, validateSolution, catchAsync(stones.submitAnswer))
  .delete(isLoggedIn, isAdmin, catchAsync(stones.deleteStone));
module.exports = router;
