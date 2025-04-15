const Product = require('../models/productModel');

exports.getProducts = (req, res) => {
  Product.getAllProducts((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getProduct = (req, res) => {
  Product.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  Product.createProduct(req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Product created', id: result.insertId });
  });
};

exports.updateProduct = (req, res) => {
  Product.updateProduct(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Product updated' });
  });
};

exports.deleteProduct = (req, res) => {
  Product.deleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Product deleted' });
  });
};
