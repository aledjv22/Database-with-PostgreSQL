const Joi = require('joi');

const id = Joi.string().uuid();
const user = Joi.string().min(3).max(15);
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  user: user.required(),
  isBlock: isBlock.required(),
});

const updateUserSchema = Joi.object({
  user: user,
  isBlock: isBlock,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema }