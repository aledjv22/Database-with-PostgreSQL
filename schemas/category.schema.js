const Joi = require('joi');

const id = Joi.string().uuid();
const category = Joi.string().alphanum().min(3).max(15);

const createCategorySchema = Joi.object({
  categorie: category.required(),
});

const updateCategorySchema = Joi.object({
  categorie: category,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema}