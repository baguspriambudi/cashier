const Qrcode = require('qrcode');
const mongoose = require('mongoose');
const Product = require('../model/Product');
const { httpOkResponse } = require('../helper/http_respone');

exports.createProduct = async (req, res, next) => {
  try {
    const { name, stock, price, diskon } = req.body;
    const product = await new Product({
      name: name,
      stock: stock,
      price: price,
      diskon: diskon,
    }).save();
    const parseStr = mongoose.Types.ObjectId(product._id).toHexString();
    const generate = await Qrcode.toDataURL(parseStr);
    if (product) {
      await Product.findOneAndUpdate({ _id: product._id }, { qrcode: generate });
    }
    httpOkResponse(res, 'data product successfully inputed', product);
  } catch (error) {
    next(error);
  }
};
