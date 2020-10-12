const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const userController = require('../controller/user');

router.post('/create', auth.isAdmin, userController.createuser);

module.exports = router;
