const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();
const PORT = 5000;

dotenv.config();

const auth = require('./middlleware/auth');
const schema = require('./middlleware/Schema');

const user = require('./route/user_route');
const member = require('./route/member_route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

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
  });
});

const router = express.Router();
router.post('/auth/user/create', schema.midRegister, user.createuser);
router.post('/auth/member/create', auth.isAdmin, schema.midMember, member.createMember);
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
