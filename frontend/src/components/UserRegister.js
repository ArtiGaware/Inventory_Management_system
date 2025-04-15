// src/components/UserRegister.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function UserRegister() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Clear form when component mounts
    setUser({ username: '', password: '' });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!user.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (user.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!user.password) {
      newErrors.password = 'Password is required';
    } else if (user.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:5000/api/auth/user-register', user)
      .then(() => {
        alert('User registered successfully');
        setUser({ username: '', password: '' }); // Clear form
        setErrors({});
        navigate('/user-login');
      })
      .catch((err) => {
        alert(err.response?.data?.message || 'Registration failed');
        console.error(err);
      });
  };

  return (
    <Container className="my-4 main-content">
      <h2>User Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter your username" // ✅ Placeholder added
            value={user.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password" // ✅ Placeholder added
            value={user.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="me-2">Register</Button>

        <Button
          variant="secondary"
          type="reset"
          className="me-2"
          onClick={() => {
            setUser({ username: '', password: '' });
            setErrors({});
          }}
        >
          Reset
        </Button>

        <Button variant="secondary" onClick={() => navigate('/user-login')}>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default UserRegister;
