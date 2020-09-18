const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const JWTsekret = process.env.JWT_KEY;
const { httpNotFound, httpAuthenticationFailed, httpOkResponse } = require('../helper/http_respone');

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
