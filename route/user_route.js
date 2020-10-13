const express = require('express');

const router = express.Router();

const Schema = require('../middlleware/Schema');
const userController = require('../controller/user');

router.post('/create', Schema.midRegister, userController.createuser);
router.post('/login', Schema.midRegister, userController.login);

module.exports = router;
