const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const price = Joi.number().positive().min(10);
const description = Joi.string().min(5);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const createdAt = Joi.date();

const price_min = Joi.number().positive();
const price_max = Joi.number().positive();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

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

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = { 
  createProductSchema, 
  updateProductSchema, 
  getProductSchema, 
  deleteProductSchema, 
  queryProductSchema 
}