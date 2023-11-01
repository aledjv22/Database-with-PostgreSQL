const express = require('express');
const passport = require('passport');

const UsersService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, 
        updateUserSchema, 
        getUserSchema, 
        deleteUserSchema 
      } = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async  (req, res) => {
  const users = await service.find();

  res.json(users);
});

router.get('/:id', 
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
});

router.post('/', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
});

router.patch('/:id', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);

      res.json(user);
    } catch (error) {
      next(error);
    }
});

router.delete('/:id', 
  passport.authenticate('jwt', {session: false}),
  validatorHandler(deleteUserSchema, 'params'),
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