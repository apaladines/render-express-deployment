const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBlock = Joi.bool();

const findProductSchema = Joi.object({
  id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

module.exports = { createProductSchema, updateProductSchema, findProductSchema };
