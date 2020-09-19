const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    code: { type: String },
  },
  { timestamp: true },
);

module.exports = mongoose.model('Transaction', transactionSchema);
