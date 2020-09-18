const Qrcode = require('qrcode');
const mongoose = require('mongoose');
const Product = require('../model/Product');
const { httpOkResponse, httpNotFound } = require('../helper/http_respone');

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

exports.updateProduct = async (req, res, next) => {
  try {
    const Id = await Product.findById({ _id: req.query.id });
    if (!Id) {
      return httpNotFound(res, 'id product not found');
    }
    const product = await Product.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true });
    httpOkResponse(res, 'update successfully', product);
  } catch (error) {
    next(error);
  }
};
