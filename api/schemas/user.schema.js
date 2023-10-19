const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const createdAt = Joi.date();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  createdAt: createdAt.required()
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  createdAt: createdAt
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema }