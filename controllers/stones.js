const Stone = require('../models/stone');
const User = require('../models/user');

let time_start = new Date('Jan 10, 2022 18:00:00').getTime();
let time_end = new Date('Jan 11, 2022 00:00:00').getTime();

module.exports.index = async (req, res) => {
  let time_current = new Date().getTime();
  if (req.user.username != 'admin' && time_current < time_start) {
    res.render('stones/countdown');
  } else {
    let time_remaining = time_end - time_current;
    const stones = await Stone.find({}).populate('submissions.user');
    console.log(stones[0].submissions[0].user.username);
    const colorc = [
      'bg-info',
      'bg-primary',
      'bg-secondary',
      'bg-success',
      'bg-danger',
      'bg-warning',
    ];
    res.render('stones/index', { stones, colorc, time_remaining });
  }
};

module.exports.renderNewForm = async (req, res) => {
  res.render('stones/new');
};

module.exports.leaderBoard = async (req, res) => {
  const users = await User.find({ username: { $ne: 'admin' } })
    .sort({
      score: -1,
      lastSubmission: 1,
    })
    .select('-solution');
  res.render('stones/leaderboard', { users });
};

module.exports.submitAnswer = async (req, res) => {
  let time_current = new Date().getTime();
  if (req.user.username != 'admin' && time_start > time_current) {
    req.flash('error', 'Please Wait for the event to start');
    res.redirect('/stones');
  } else if (req.user.username != 'admin' && time_end < time_current) {
    req.flash('error', 'You cannot submit anymore, The event is over.');
    res.redirect('/stones');
  }
  const stone = await Stone.findById(req.params.id);
  const userc = await User.findOne({
    _id: req.user._id,
    submissions: stone._id,
  });
  if (!userc) {
    if (req.body.AnswerStone == stone.solution) {
      let time = new Date();
      stone.submissions.push({ user: req.user._id, time });
      const user = await User.findOne({
        _id: req.user._id,
      });
      user.submissions.push(stone._id);
      user.lastSubmission = time;
      user.score += stone.reward;
      await stone.save();
      await user.save();
      req.flash(
        'success',
        `Your Answer was correct! You have successfully claimed ${stone.name}.`,
      );
      res.redirect('/stones');
    } else {
      req.flash('error', `Your Answer was incorrect.`);
      res.redirect('/stones');
    }
  } else {
    req.flash('error', 'You have already claimed the stone.');
    res.redirect('/stones');
  }
};

module.exports.createStone = async (req, res, next) => {
  const stone = new Stone(req.body.stone);
  await stone.save();
  req.flash('success', 'Successfully made a new stone');
  res.redirect(`/stones`);
};

module.exports.deleteStone = async (req, res) => {
  const { id } = req.params;
  await Stone.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted Stone. :(');
  res.redirect(`/stones`);
};
