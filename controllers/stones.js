const Stone = require('../models/stone');
const User = require('../models/user');

module.exports.index = async (req, res) => {
  const stones = await Stone.find({});
  res.render('stones/index', { stones });
};

module.exports.leaderBoard = async (req, res) => {
  res.render('stones/leaderboard');
};

module.exports.submitAnswer = async (req, res) => {
  const stone = Stone.findById(req.params.id);
  const user = User.count({ _id: req.user._id });
  if (req.query.answer == stone.solution) {
    let time = new Date();
    stone.submissions.push({ user: req.user._id, time });
    user.submissions.push(stone._id);
    user.lastSubmissionn = time;
    user.score += stone.reward;
    stone.save();
    user.save();
    res.json({
      success: true,
      message: `Your Answer was correct! You have won ${stone.reward} points.`,
    });
  } else res.json({ success: true });
};
