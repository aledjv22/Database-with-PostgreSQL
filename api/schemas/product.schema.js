const Joi = require('joi');

const id = Joi.string();
const title = Joi.string().min(3);
const price = Joi.number().integer().min(10);
const image = Joi.string(); //.uri();

const createProductSchema = Joi.object({
  title: title.required(),
  price: price.required(),
  image: image.required()
});

const updateProductSchema = Joi.object({
  title: title,
  price: price,
  image: image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const deleteProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema }