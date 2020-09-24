const Product = require('../model/Product');
const TransactionProudcts = require('../model/TransactionProducts');
const Transaction = require('../model/Transactions');
const Member = require('../model/Member');
const {
  httpAuthenticationFailed,
  httpNotFound,
  httpOkResponseTransaction,
  httpOkResponse,
} = require('../helper/http_respone');

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
    let afterdiscount = 0;
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
      afterdiscount = price - diskon;
    } else {
      afterdiscount = price;
    }
    // validasi when customer has a member
    if (findmember && price >= 10000) {
      diskonMember = afterdiscount * 0.05;
    }
    // validasi discount max 20000
    let diskonMax = diskonMember;
    if (diskonMax >= 20000) {
      diskonMax = 20000;
    }
    console.log(diskonMember);
    const priceAfterDiskonAndMember = afterdiscount - diskonMax;
    await Transaction.updateOne({ _id: _idTransaction }, { amount: priceAfterDiskonAndMember });
    httpOkResponseTransaction(res, 'succesfully create transaction', {
      products: dataTransaction,
      amount: priceAfterDiskonAndMember,
    });
  } catch (error) {
    next(error);
  }
};

exports.viewTrxDate = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { start, end } = req.body;
    if (!start && !end) {
      return httpOkResponse(res, 'data founded', await Transaction.find({}));
    }
    const findtrx = await Transaction.find({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    }).sort({ createdAt: 1 }); // mengurutkan dari tanggal paling kecil ke besar
    httpOkResponse(res, 'data founded', findtrx);
  } catch (error) {
    next(error);
  }
};

exports.viewtransactions = async (req, res, next) => {
  try {
    const { page } = req.query;
    // eslint-disable-next-line radix
    const int = parseInt(page);
    const pageInt = int * 10 - 10;
    const findTransactions = await Transaction.find({}).skip(pageInt).limit(10);
    httpOkResponse(res, 'data founded', { data: findTransactions, count: findTransactions.length });
  } catch (error) {
    next(error);
  }
};

exports.viewtransactionsbyprice = async (req, res, next) => {
  try {
    // const aq = [];
    // const bq = [];
    const { start, end } = req.body;
    const transactionByPrice = await Transaction.find({ amount: { $gte: start, $lte: end } })
      .sort({ amount: 1 })
      .populate('Product');
    const result = transactionByPrice.map((a) => a._id); // mengambil id di object array transactionByPrice
    // console.log(result);
    const product = await TransactionProudcts.find({
      transaction: result,
    });
    // const trx = await Transaction.findOne({});

    transactionByPrice.map(async (val) => {
      const a = await Transaction.findById(val._id);
      const productt = await TransactionProudcts.findOne({ transaction: a });
      // console.log(a);
      console.log(productt);
    });
    // const c = a.push(b);
    // const newfind = transactionByPrice.join(aq);
    // console.log(newfind);
    // const newfindd = product.join(aq);
    // const z = newfind.concat(newfindd);
    // console.log(z);
    // const products = product.map(async(val)=>{})
    httpOkResponse(res, 'data founded', { transaction_by_price: transactionByPrice, data1: product });
  } catch (error) {
    next(error);
  }
};
// iki tak nggo nyobo nyobo
exports.view = async (req, res, next) => {
  try {
    const { start, end } = req.body;
    const a = await Transaction.find({ amount: { $gte: start, $lte: end } }).sort({ amount: 1 });
    // const result = a.map((d) => d._id);
    // const z = [];
    Promise.all(
      a.map(async (val) => {
        const c = await TransactionProudcts.find({ transaction: val._id });
        a.product = c;
        console.log(a);
      }),
    );
    httpOkResponse(res, 'cek', a);
    // console.log(z);
  } catch (error) {
    next(error);
  }
};
