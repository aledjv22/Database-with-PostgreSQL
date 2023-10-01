const express = require('express');
const CategoriesService = require('../services/category.service');
const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
  const categories = await service.find()
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await service.findOne(id);

    res.status(200).json(categorie);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.get('/:categoryId/:products/:productId', (req, res) =>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);

  res.status(201).json(newCategory);
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);

    res.json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await service.delete(id);

    res.json(answer);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

module.exports = router;