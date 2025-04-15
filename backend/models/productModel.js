const db = require('../config/db');

// Get all products
const getAllProducts = (callback) => {
  db.query('SELECT * FROM products', callback);
};

// Get product by ID
const getProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

// Create new product
const createProduct = (data, callback) => {
  const { name, quantity, price } = data;
  db.query(
    'INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)',
    [name, quantity, price],
    callback
  );
};

// Update product
const updateProduct = (id, data, callback) => {
  const { name, quantity, price } = data;
  db.query(
    'UPDATE products SET name = ?, quantity = ?, price = ? WHERE id = ?',
    [name, quantity, price, id],
    callback
  );
};

// Delete product
const deleteProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE id = ?', [id], callback);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
