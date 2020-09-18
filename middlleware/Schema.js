const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const { httpValidasiDataErrorRespone } = require('../helper/http_respone');

exports.midRegister = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midMember = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};
