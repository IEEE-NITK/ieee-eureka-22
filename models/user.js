const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Stone = require('./stone');
const UserSchema = new Schema({
  score: {
    type: Number,
    default: 0,
  },
  lastSubmission: {
    type: Date,
    Default: '-',
  },
  team_member_1: {
    name: {
      type: String,
      required: true,
    },
    roll_no: {
      type: String,
      required: true,
    },
  },
  team_member_2: {
    name: {
      type: String,
    },
    roll_no: {
      type: String,
    },
  },
  submissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stone',
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
