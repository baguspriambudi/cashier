const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const schema = require('../middlleware/Schema');
const memberController = require('../controller/member');

router.post('/create', auth.isAdmin, schema.midMember, memberController.createMember);

module.exports = router;
