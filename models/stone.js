const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const stoneSchema = new Schema({
  name: String,
  text: String,
  title: String,
  body: String,
  imageURL: String,
  filelink: String,
  hint: String,
  reward: {
    type: Number,
    default: 1,
  },
  solution: String,
  submissions: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

module.exports = mongoose.model('Stone', stoneSchema);
