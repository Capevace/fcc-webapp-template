const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  twitter: {
    id: String,
    username: String,
    displayName: String,
    token: String,
  }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

const pollSchema = new Schema({
  author : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question : {
    type: String,
    required: true
  },
  options : [{
    id: Schema.Types.ObjectId,
    body: String
  }],
  votes: [Schema.Types.ObjectId],
  votedBy: [{
    ip: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Poll: mongoose.model('Poll', pollSchema)
};
