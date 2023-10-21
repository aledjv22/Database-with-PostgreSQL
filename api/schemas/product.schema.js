const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const price = Joi.number().positive().min(10);
const description = Joi.string().min(5);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const createdAt = Joi.date();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  createdAt: createdAt
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
  createdAt: createdAt
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema }