const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(15);

const createUserSchema = Joi.object({
  name: name.required(),
});

const updateUserSchema = Joi.object({
  name: name,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema}