const express = require('express');

const app = express();

const port = 3000;

app.get('/', (require, resolve) => {
  resolve.send('Hello my server with express.');
});

app.get('/new-route', (require, resolve) => {
  resolve.send('Hello, I am a new route.');
});

app.get('/products', (require, resolve) => {
  resolve.json({
    name: 'Product 1',
    price: 1000
  });
});

app.listen(port, () => {
  console.log('My port is: ' + port);
});