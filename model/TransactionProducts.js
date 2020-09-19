const mongoose = require('mongoose');

const TransactionProductsSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
  qty: { type: Number, required: true },
  tgl: { type: Date },
  member: { type: String },
  price: { type: Number },
  amount: { type: Number },
});

module.exports = mongoose.model('TransactionProduct', TransactionProductsSchema);
