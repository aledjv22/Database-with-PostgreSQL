const Joi = require('joi');

const id = Joi.string();
const email = Joi.string().email();
const password = Joi.string();
const role = Joi.string().min(3);
const createdAt = Joi.date();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
  createdAt: createdAt
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
  createdAt: createdAt
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema }