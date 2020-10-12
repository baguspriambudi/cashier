const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const Schema = require('../middlleware/Schema');
const userController = require('../controller/user');

router.post('/create', auth.isAdmin,Schema.midRegister, userController.createuser);

module.exports = router;
