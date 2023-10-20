const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(5);
const image = Joi.string().uri();
const createdAt = Joi.date();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  createdAt: createdAt
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  createdAt: createdAt
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema }