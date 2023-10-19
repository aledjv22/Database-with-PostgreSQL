const express = require('express');

const CategoriesService = require('../services/category.service');

const validatorHandler = require('../middlewares/validator.handler');

const { createCategorySchema, 
        updateCategorySchema, 
        getCategorySchema, 
        deleteCategorySchema 
      } = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find()

  res.json(categories);
});

router.get('/:id', 
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categorie = await service.findOne(id);

      res.status(200).json(categorie);
    } catch (error) {
      next(error);
    }
});

router.get('/:categoryId/:products/:productId', (req, res) =>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.post('/', 
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);

    res.status(201).json(newCategory);
});

router.patch('/:id', 
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);

      res.json(category);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', 
  validatorHandler(deleteCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const answer = await service.delete(id);

      res.json(answer);
    } catch (error) {
      next(error);
    }
});

module.exports = router;