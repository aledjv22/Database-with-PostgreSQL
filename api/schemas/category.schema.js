const Joi = require('joi');

const id = Joi.string();
const category = Joi.string().min(3); //.max(15);
const createdAt = Joi.date();

const createCategorySchema = Joi.object({
  category: category.required(),
  createdAt: createdAt.required()
});

const updateCategorySchema = Joi.object({
  category: category,
  createdAt: createdAt
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema }