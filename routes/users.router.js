const express = require('express');
const UsersService = require('../services/user.service');
const router = express.Router();
const service = new UsersService();

router.get('/', async  (req, res) => {
  const users = await service.find();

  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);

  res.status(201).json(newUser);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const answer = await service.delete(id);

    res.json(answer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;