const mongoose = require('mongoose');

const MemberSchema = mongoose.Schema(
  {
    memberId: { type: String, required: true, unique: true },
    name: { type: String, required: true, lowercase: true },
    expired: { type: Date, required: true },
    diskon: { type: Number },
  },
  // { _id: false },
);

module.exports = mongoose.model('Member', MemberSchema);
