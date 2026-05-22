/* =========================================
   API Layer - handles all backend requests
   ========================================= */
const API_BASE = 'https://YOUR-RAILWAY-URL/api/products';

const api = {
  // GET all products
  async getAll() {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // CREATE a new product
  async create(product) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return res.json();
  },

  // UPDATE existing product by id
  async update(id, product) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return res.json();
  },

  // DELETE a product by id
  async remove(id) {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return true;
  },
};
