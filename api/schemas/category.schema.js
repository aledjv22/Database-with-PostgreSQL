const Joi = require('joi');

const id = Joi.string();
const name = Joi.string().min(3); //.max(15);
const image = Joi.string().uri();
const createdAt = Joi.date();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
  createdAt: createdAt
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image,
  createdAt: createdAt
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema }