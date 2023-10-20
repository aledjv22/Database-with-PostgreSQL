const Joi = require('joi');

const id = Joi.string();
const title = Joi.string().min(3);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(5);
const image = Joi.string(); //.uri();
const category = Joi.string().min(3);
const createdAt = Joi.date();

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  category: category.required(),
  createdAt: createdAt
});

const updateProductSchema = Joi.object({
  title: title,
  price: price,
  description: description,
  image: image,
  category: category,
  createdAt: createdAt
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema }