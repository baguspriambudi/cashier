const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({}, { timestamp: true });

module.exports = mongoose.model('Transaction', transactionSchema);
