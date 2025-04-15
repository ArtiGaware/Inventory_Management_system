import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added successfully!');
      navigate('/products'); // ✅ Redirect to product list
    } catch (error) {
      console.error(error);
      alert('Error adding product');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
