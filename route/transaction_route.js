const Produk = require('../model/Product');
const { httpAuthenticationFailed, httpNotFound, httpOkResponse } = require('../helper/http_respone');

exports.createTransactions = async (req, res, next) => {
  try {
    const transaction = req.body;
    const date = new Date();
    const findProduct = await Produk.findOne({ _id: transaction.product });
    if (findProduct.stock === 0) {
      return httpNotFound(res, 'product not found');
    }
  } catch (error) {
    next(error);
  }
};
