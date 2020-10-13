const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const JWTsekret = process.env.JWT_KEY;
const User = require('../model/User');
const {
  httpNotFound,
  httpAuthenticationFailed,
  httpValidasiErroResponse,
  httpOkResponse,
} = require('../helper/http_respone');

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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const login = await User.findOne({ username: username });
    if (!login) {
      return httpNotFound(res, 'username not found');
    }
    const compare = bcrypt.compareSync(password, login.password);
    if (!compare) {
      return httpAuthenticationFailed(res, 'password not match');
    }
    const token = JWT.sign({ _id: login._id, role: login.role }, JWTsekret, { expiresIn: '24h' });
    httpOkResponse(res, 'succes login', token);
  } catch (error) {
    next(error);
  }
};
