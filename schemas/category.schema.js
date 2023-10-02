const Joi = require('joi');

const id = Joi.string().uuid();
const category = Joi.string().min(3).max(15);
const isBlock = Joi.boolean();

const createCategorySchema = Joi.object({
  categorie: category.required(),
  isBlock: isBlock.required(),
});

const updateCategorySchema = Joi.object({
  categorie: category,
  isBlock: isBlock,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, deleteCategorySchema }