const express = require('express');
const passport = require('passport');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, 
        updateProductSchema, 
        getProductSchema, 
        deleteProductSchema,
        queryProductSchema
      } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', 
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
    
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

// Specific endpoints must come before the dynamic  
// ones, that's why /filter comes before :id
router.get('/filter', (req, res) => {
  res.send('I am a filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
});

router.post('/', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);

      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);

      res.json(product);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(deleteProductSchema, 'params'),
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