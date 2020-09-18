const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

module.exports = mongoose.model('User', UserSchema);
