import React, { useEffect, useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();

    // ✅ Re-fetch when page regains focus (useful after navigating back)
    const handleFocus = () => {
      fetchProducts();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleEdit = (id) => navigate(`/edit/${id}`);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => fetchProducts()) // refresh list after delete
        .catch(err => console.error(err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userLoggedIn');
    alert(`${userType === 'admin' ? 'Admin' : 'User'} signed out successfully`);
    navigate(userType === 'admin' ? '/admin-login' : '/user-login');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product List</h2>
        <div className="d-flex gap-2">
          {userType === 'admin' && (
            <Button variant="primary" onClick={() => navigate('/add')}>
              Add Product
            </Button>
          )}
          <Button variant="secondary" onClick={handleSignOut}>
            {userType === 'admin' ? 'Admin Sign Out' : 'User Sign Out'}
          </Button>
        </div>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(product.id)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(product.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
