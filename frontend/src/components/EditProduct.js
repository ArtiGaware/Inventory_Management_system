import React, { useState, useEffect } from 'react';
import { getProduct, updateProduct } from '../services/productService';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, product)
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  return (
    <Container className="my-4">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="quantity" className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update</Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
