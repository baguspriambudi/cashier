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

exports.midUpdateMember = (req, res, next) => {
  const schema = Joi.object({
    memberId: Joi.string().required(),
    expired: Joi.number().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midProduct = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().required(),
    price: Joi.number().required(),
    diskon: Joi.number().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};
exports.midProductUpdate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.query);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midTransactionProducts = (req, res, next) => {
  const schema = Joi.object({
    member: Joi.string().required().allow(''),
    products: Joi.array()
      .required()
      .items(
        Joi.object({
          product: Joi.objectId().required(),
          qty: Joi.number().required(),
        }),
      ),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midProductViewTransactions = (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().default(1),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.query);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midProductViewTransactionbaseOnDate = (req, res, next) => {
  const schema = Joi.object({
    start: Joi.date().required().optional(),
    end: Joi.date().required().optional(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midProductViewTransactionsByPrice = (req, res, next) => {
  const schema = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};
