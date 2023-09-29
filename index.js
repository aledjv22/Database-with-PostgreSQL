const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello my server with express.');
});

app.get('/new-route', (req, res) => {
  res.send('Hello, I am a new route.');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }

  res.json(products);
});

// Specific endpoints must come before the dynamic  
// ones, that's why /filter comes before :id
app.get('/products/filter', (req, res) => {
  res.send('I am a filter');
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  });
});


app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset){
    res.json({
      limit,
      offset
    });
  } else {
    res.send('There are no parameters.');
  }
});

app.get('/categories/:categoryId/:products/:productId', (req, res) =>{
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

app.listen(port, () => {
  console.log('My port is: ' + port);
});