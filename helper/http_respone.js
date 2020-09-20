exports.httpOkResponse = (res, msg, data) => {
  res.status(200).json({
    status: 200,
    message: msg,
    data: data,
  });
};

exports.httpOkResponseTransaction = (res, msg, data, amount) => {
  res.status(200).json({
    status: 200,
    message: msg,
    data: data,
    amount: amount,
  });
};

// mengecek kebenaran data validasi
exports.httpValidasiErroResponse = (res, msg) => {
  res.status(400).json({
    status: 400,
    message: msg,
  });
};

// validasi schema
exports.httpValidasiDataErrorRespone = (res, error) => {
  res.status(400).json({
    status: 400,
    message: 'Validation Error',
    error: error,
  });
};

// mengecek apakah bener apa nggak email atau password atau token
exports.httpAuthenticationFailed = (res, msg) => {
  res.status(401).json({
    status: 401,
    message: msg,
  });
};
// akses untuk token atau dengan kode tertentu
exports.httpUnauthorizedRespone = (res, msg) => {
  res.status(403).json({
    status: 403,
    message: msg,
  });
};
// jika yang dicari tidak ada
exports.httpNotFound = (res, msg) => {
  res.status(404).json({
    status: 404,
    message: msg,
  });
};
