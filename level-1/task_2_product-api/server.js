const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Smartphone', price: 499.99 },
];

//create operations
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

//read operations
app.get('/api/products', (req, res) => {
  return res.status(200).json(products);
});

// update operations
app.put('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (
    req.body &&
    req.body.price !== undefined &&
    isNaN(Number(req.body.price))
  ) {
    return res.status(400).json({ error: 'Price must be a valid number' });
  }

  // Using ternaries to safely update fields if they exist, or keep original data
  product.name =
    req.body && req.body.name ? String(req.body.name) : product.name;
  product.price =
    req.body && req.body.price !== undefined
      ? Number(req.body.price)
      : product.price;

  return res.status(200).json(product);
});

// delete operations
app.delete('/api/products/:id', (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex((p) => p.id === productId);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(index, 1);
  return res.status(200).json({
    message: 'Product deleted successfully',
    product: deletedProduct[0],
  });
});

app.listen(PORT, () => {
  console.log(`SERVER_RESTARTED_SUCCESSFULLY`);
});
