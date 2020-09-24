const mongoose = require('mongoose');

const date = new Date();

const nowUtc = Date.UTC(
  date.getUTCFullYear(),
  date.getUTCMonth(),
  date.getUTCDate(),
  date.getUTCHours(0, 0, 0, 0) + 7,
  date.getUTCMinutes(),
  date.getUTCSeconds(),
);
const datenow = new Date(nowUtc).setUTCHours(0, 0, 0, 0);
console.log(new Date(datenow));
const opts = {
  timestamps: { currentTime: () => datenow },
};
const transactionSchema = mongoose.Schema({ amount: { type: Number } }, opts);

module.exports = mongoose.model('Transaction', transactionSchema);
