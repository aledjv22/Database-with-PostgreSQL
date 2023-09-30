const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const limit =  size || 10;
  const users = [];

  for (let index = 0; index < limit; index++) {
    users.push({
      user: faker.internet.userName(),
    });
  }

  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    id,
    user: faker.internet.userName(),
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