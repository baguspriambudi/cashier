const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

const schema = require('./middlleware/Schema');
const auth = require('./middlleware/auth');

const user = require('./route/user_route');
const login = require('./route/login_route');
const member = require('./route/member_route');
const product = require('./route/produk_route');
const transactionProduct = require('./route/transaction_proudct_route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'test') app.use(morgan('combined'));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('mongodb connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'system cashier service up and running',
    environment: process.env.NODE_ENV,
    timestamp: new Date(),
  });
});

const router = express.Router();
router.post('/auth/user/create', schema.midRegister, user.createuser);
router.post('/auth/user/login', schema.midRegister, login.login);
router.post('/auth/member/create', auth.isAdmin, schema.midMember, member.createMember);
router.post('/auth/member/update', auth.isAdmin, schema.midUpdateMember, member.updateMember);
router.post('/auth/product/create', auth.isAdmin, schema.midProduct, product.createProduct);
router.post('/auth/product/update', auth.isAdmin, schema.midProductUpdate, product.updateProduct);
router.post(
  '/auth/transaction_product/create',
  auth.isAdmin,
  schema.midTransactionProducts,
  transactionProduct.createTransactions,
);
router.get(
  '/auth/transaction_product/view',
  schema.midProductViewTransactionbaseOnDate,
  transactionProduct.viewTrxDate,
);
router.get(
  '/auth/transaction_product/view/transactions',
  auth.isAdmin,
  schema.midProductViewTransactions,
  transactionProduct.viewtransactions,
);
router.get(
  '/auth/transaction_product/view/transactionsbyprice',
  auth.isAdmin,
  schema.midProductViewTransactionsByPrice,
  transactionProduct.viewtransactionsbyprice,
);
app.use('/api/v1', router);

app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 400;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    status: error.status || 500,
    error: error.message,
  });
});

app.listen(PORT, console.log(`listening to PORT ${PORT}`));

module.exports = app;
