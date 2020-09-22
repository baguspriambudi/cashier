const mongoose = require('mongoose');

const datenow = new Date().setHours(0, 0, 0, 0);
// console.log(datenow);

const date = new Date(datenow);
// return console.log(date);
console.log(date);
const opts = {
  // Make Mongoose use Unix time (seconds since Jan 1, 1970)
  timestamps: { currentDate: () => date },
};
const transactionSchema = mongoose.Schema({}, opts);

module.exports = mongoose.model('Transaction', transactionSchema);
