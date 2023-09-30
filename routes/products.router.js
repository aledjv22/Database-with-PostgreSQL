const express = require('express');
const ProductsService = require('../services/product.service');
const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  
  res.json(products);
});

// Specific endpoints must come before the dynamic  
// ones, that's why /filter comes before :id
router.get('/filter', (req, res) => {
  res.send('I am a filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  
  res.status(200).json(product);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);

  res.status(201).json(newProduct);
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);

  res.json(product);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const answer = service.delete(id);

  res.json(answer);
});

module.exports = router;