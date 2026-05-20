const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
];

app.post('/api/products', (req, res) => {
  const name = req.body && req.body.name ? String(req.body.name) : null;
  const price =
    req.body && req.body.price !== undefined ? Number(req.body.price) : null;

  if (!name || price === null || isNaN(price)) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const freshProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: name,
    price: price,
  };

  products.push(freshProduct);
  return res.status(201).json(freshProduct);
});

app.get('/api/products', (req, res) => {
  return res.status(200).json(products);
});

app.listen(PORT, () => {
  console.log(`SERVER_RESTARTED_SUCCESSFULLY`);
});
