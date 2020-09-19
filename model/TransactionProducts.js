const mongoose = require('mongoose');

const TransactionProductsSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  transaction: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Transaction' },
  qty: { type: Number, required: true },
  tgl: { type: Date },
  member: { type: String, ref: 'Member' },
  price: { type: Number },
  diskon: { type: Number },
});

module.exports = mongoose.model('TransactionProduct', TransactionProductsSchema);
