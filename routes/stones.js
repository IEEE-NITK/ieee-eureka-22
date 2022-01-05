const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const stones = require('../controllers/stones');

/* const { stoneSchema } = require('../schemas'); */

const { isLoggedIn } = require('../middleware');

router.route('/').get(catchAsync(stones.index)).post(
  isLoggedIn,
  /* validateCampground, */
  catchAsync(stones.postAnswer),
);
router.get('/leaderboard', catchAsync(stones.leaderBoard));

router.route('/:id').post(catchAsync(stones.submitAnswer));

module.exports = router;
