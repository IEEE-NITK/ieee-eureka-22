const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const stoneSchema = new Schema({
  title: String,
  body: String,
  imageURL: String,
  filelink: String,
  Filerequired: Boolean,
  reward: Number,
  solution: String,
  submissions: [
    {
      users: {
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
