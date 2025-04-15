// src/components/AdminLogin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear fields on component mount
    setAdmin({ username: '', password: '' });
    setErrors({});
    setShowError(false);
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear individual error
  };

  const validate = () => {
    const newErrors = {};
    if (!admin.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (admin.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!admin.password) {
      newErrors.password = 'Password is required';
    } else if (admin.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);
      return;
    }

    axios.post('http://localhost:5000/api/auth/admin-login', admin)
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userLoggedIn', true);
        navigate('/products');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Login failed');
        console.error(err);
      });
  };

  const handleGoToRegistration = () => {
    navigate('/admin-register');
  };

  const handleReset = () => {
    setAdmin({ username: '', password: '' });
    setErrors({});
    setShowError(false);
  };

  return (
    <Container className="my-4">
      <h2>Admin Login</h2>

      {showError && Object.keys(errors).length > 0 && (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
          {Object.values(errors).map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </Alert>
      )}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Enter your username" // Added placeholder
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Enter your password" // Added placeholder
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="me-2">Login</Button>
        <Button variant="secondary" onClick={handleGoToRegistration}>Admin Registration</Button>
        <Button variant="outline-danger" onClick={handleReset} className="ms-2">Reset</Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;
