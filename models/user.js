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
