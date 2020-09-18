const mongoose = require('mongoose');

const TransactionsSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  qty: { type: Number, required: true },
  tgl: { type: Date },
  member: { type: String },
  mount: { type: Number },
});

module.exports = mongoose.model('Transactions', TransactionsSchema);
