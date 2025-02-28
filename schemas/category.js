const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);

const findCategorySchema = Joi.object({
  id: id.required(),
});

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

module.exports = { findCategorySchema, createCategorySchema, updateCategorySchema };
