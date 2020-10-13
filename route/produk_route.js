const express = require('express');

const router = express.Router();

const auth = require('../middlleware/auth');
const schema = require('../middlleware/Schema');
const productController = require('../controller/product');

router.post('/create', auth.isAdmin, schema.midProduct, productController.createProduct);
router.post('/update', auth.isAdmin, schema.midProductUpdate, productController.updateProduct);

module.exports = router;
