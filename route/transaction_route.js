const Produk = require('../model/Product');
const Transaction = require('../model/Transactions');
const { httpAuthenticationFailed, httpNotFound, httpOkResponse } = require('../helper/http_respone');

exports.createTransactions = async (req, res, next) => {
  try {
    const transaction = req.body;
    const date = new Date();
    let total = 0;
    const looping = await Promise.all(
      transaction.map(async (val) => {
        total += val.qty;
        return new Transaction({ product: val.product, qty: val.qty });
      }),
    );
    res.status(200).json({
      msg: 'succes',
    });
    // const date = new Date();
    // const findProduct = await Produk.findOne({ _id: transaction.product });
    // if (findProduct.stock === 0) {
    //   return httpNotFound(res, 'product not found');
    // }
  } catch (error) {
    next(error);
  }
};
