const express = require('express');
const CategoriesService = require('../services/category.service');
const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find()
  res.json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const categorie = service.findOne(id);

  res.status(200).json(categorie);
});

router.get('/:categoryId/:products/:productId', (req, res) =>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;