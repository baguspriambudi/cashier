const Product = require('../model/Product');
const TransactionProudcts = require('../model/TransactionProducts');
const { httpAuthenticationFailed, httpNotFound } = require('../helper/http_respone');

exports.createTransactions = async (req, res, next) => {
  try {
    const transaction = req.body;
    const date = new Date();
    const productNotFoundIds = [];
    const productStockEmpty = [];

    // valiadis find produk
    await Promise.all(
      transaction.map(async (val) => {
        const product = await Product.findById(val.product);
        if (!product) {
          productNotFoundIds.push(val.product);
        } else if (product.stock === 0) {
          productStockEmpty.push(val.product);
        }
      }),
    );
    if (productNotFoundIds.length) {
      return httpNotFound(res, `product ids ${productNotFoundIds} not found`);
    }
    if (productStockEmpty.length) {
      return httpAuthenticationFailed(res, `product ids ${productStockEmpty} empty`);
    }

    let price = 0;
    const initialPrice = [];
    await Promise.all(
      transaction.map(async (val) => {
        const findProduct = await Product.findById({ _id: val.product });
        initialPrice.push(findProduct.price);
        price += findProduct.price;
      }),
    );

    initialPrice.forEach((item) => {
      const A = item;
      console.log(A);
    });
    console.log(price);
    let total = 0;
    await Promise.all(
      transaction.map(async (val) => {
        console.log(val.qty);
        total += val.qty;
        const A = await new TransactionProudcts({ product: val.product, qty: val.qty, tgl: date, member: val.member });
        console.log(A);
      }),
    );
    console.log(total);
    res.status(200).json({
      msg: 'succes',
    });
  } catch (error) {
    next(error);
  }
};
