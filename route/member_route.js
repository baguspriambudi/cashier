const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const schema = require('../middlleware/Schema');
const memberController = require('../controller/member');

router.post('/create', auth.isAdmin, schema.midMember, memberController.createMember);
router.post('/update', auth.isAdmin, schema.midUpdateMember, memberController.updateMember);

module.exports = router;
