const Stone = require('../models/stone');
const User = require('../models/user');

module.exports.index = async (req, res) => {
  const stones = await Stone.find({});
  const colorc = [
    'bg-info',
    'bg-primary',
    'bg-secondary',
    'bg-success',
    'bg-danger',
    'bg-warning',
  ];
  res.render('stones/index', { stones, colorc });
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
  const stoneobj = {
    name: req.body.name,
    title: req.body.title,
    body: req.body.body,
    imageURL: req.body.imageURL,
    filelink: req.body.filelink,
    hint: req.body.hint,
    solution: req.body.solution,
    reward: 1,
  };
  const stone = new Stone(stoneobj);
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
