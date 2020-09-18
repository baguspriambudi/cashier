const bcrypt = require('bcrypt');
const User = require('../model/User');
const { httpValidasiErroResponse, httpOkResponse } = require('../helper/http_respone');

exports.createuser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const finduser = await User.findOne({ username: username.toLowerCase() });

    if (finduser) {
      return httpValidasiErroResponse(res, 'username already exist');
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await new User({
      username: username,
      password: passwordHash,
    }).save();
    httpOkResponse(res, 'Data succesfully inputed', user);
  } catch (error) {
    next(error);
  }
};
