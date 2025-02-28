const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const gender = Joi.string().min(3).max(10);
const job = Joi.string().min(3).max(50);

const findUserSchema = Joi.object({
  id: id.required(),
});

const createUserSchema = Joi.object({
  name: name.required(),
  gender: gender.required(),
  job: job.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  gender: gender,
  job: job,
});

module.exports = { findUserSchema, createUserSchema, updateUserSchema };
