const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
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

const routeApiV1 = express.Router();
routeApiV1.use('/auth/user', require('./route/user_route'));
routeApiV1.use('/auth/member', require('./route/member_route'));
routeApiV1.use('/auth/product', require('./route/produk_route'));
routeApiV1.use('/auth/transaction_product', require('./route/transaction_proudct_route'));

app.use('/api/v1', routeApiV1);

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
