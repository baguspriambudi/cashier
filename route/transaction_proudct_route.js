const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const schema = require('../middlleware/Schema');
const transactionProductController = require('../controller/transaction_product');

router.post('/create', auth.isAdmin, schema.midTransactionProducts, transactionProductController.createTransactions);
router.get(
  '/view/transactions_by_date',
  auth.isAdmin,
  schema.midProductViewTransactionbaseOnDate,
  transactionProductController.viewTrxDate,
);
router.get(
  '/view/transactions',
  auth.isAdmin,
  schema.midProductViewTransactions,
  transactionProductController.viewtransactions,
);
router.get(
  '/view/transactions_by_price',
  auth.isAdmin,
  schema.midProductViewTransactionsByPrice,
  transactionProductController.viewtransactionsbyprice,
);

module.exports = router;
