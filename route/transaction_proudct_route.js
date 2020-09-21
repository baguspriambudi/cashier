const Product = require('../model/Product');
const TransactionProudcts = require('../model/TransactionProducts');
const Transaction = require('../model/Transactions');
const Member = require('../model/Member');
const { httpAuthenticationFailed, httpNotFound, httpOkResponseTransaction } = require('../helper/http_respone');

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
    // validasi expired member
    if (transaction.member !== '' && date > findmember.expired) {
      return httpAuthenticationFailed(res, 'member has been expired');
    }
    // validasi find produk
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
        diskon += (findProduct.diskon / 100) * findProduct.price * val.qty;
        if (createTransaction) {
          await Product.updateOne({ _id: val.product }, { stock: findProduct.stock - val.qty });
        }
        if (createTransaction) {
          dataTransaction.push(createTransaction);
        }
      }),
    );
    // validasi discount min 10000
    if (price >= 10000) {
      // eslint-disable-next-line no-self-assign
      diskon = diskon;
    } else {
      diskon = 0;
    }
    // validasi when customer has a member
    if (findmember && price >= 10000) {
      diskonMember = price * 0.05;
    }
    // validasi discount max 20000
    let diskonMax = diskon + diskonMember;
    if (diskonMax >= 20000) {
      diskonMax = 20000;
    }
    const priceAfterDiskonAndMember = price - diskonMax;
    httpOkResponseTransaction(res, 'succesfully create transaction', {
      products: dataTransaction,
      amount: priceAfterDiskonAndMember,
    });
  } catch (error) {
    next(error);
  }
};
