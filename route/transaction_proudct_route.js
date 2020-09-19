const Product = require('../model/Product');
const TransactionProudcts = require('../model/TransactionProducts');
const Transaction = require('../model/Transactions');
const Member = require('../model/Member');
const { httpAuthenticationFailed, httpNotFound } = require('../helper/http_respone');

exports.createTransactions = async (req, res, next) => {
  try {
    const transaction = req.body;
    const date = new Date();
    const generateIdTransaction = await new Transaction({}).save();
    const _idTransaction = generateIdTransaction._id;
    const productNotFoundIds = [];
    const productStockEmpty = [];
    const dataTransaction = [];

    // validasi member
    const findmember = await Member.findOne({ memberId: transaction.member });
    if (!findmember && transaction.member !== '') {
      return httpNotFound(res, 'member not found');
    }
    // valiadis find produk
    await Promise.all(
      transaction.products.map(async (val) => {
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
    let diskon = 0;
    let diskonMember = 0;
    let priceAfterDiskon = 0;
    console.log(priceAfterDiskon);
    await Promise.all(
      transaction.products.map(async (val) => {
        const findProduct = await Product.findById({ _id: val.product });
        const createTransaction = await new TransactionProudcts({
          product: val.product,
          transaction: _idTransaction,
          qty: val.qty,
          tgl: date,
          member: val.member,
          price: findProduct.price,
          diskon: findProduct.diskon,
        }).save();
        price += createTransaction.price * val.qty;
        if (createTransaction && price >= 10000) {
          diskon = findProduct.diskon * 100;
          priceAfterDiskon = price - diskon;
        }
        if (createTransaction && findmember) {
          diskonMember = price * 0.05;
        }
        if (createTransaction) {
          await Product.updateOne({ _id: val.product }, { stock: findProduct.stock - val.qty });
        }

        if (createTransaction) {
          dataTransaction.push(createTransaction);
        }
      }),
    );
    const priceAfterDiskonAndMember = priceAfterDiskon - diskonMember;
    console.log(priceAfterDiskon);
    res.status(200).json({
      msg: 'succes',
      data: dataTransaction,
      total: priceAfterDiskonAndMember,
    });
  } catch (error) {
    next(error);
  }
};
