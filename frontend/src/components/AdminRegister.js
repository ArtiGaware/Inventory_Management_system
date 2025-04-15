// src/components/AdminRegister.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Clear fields when component mounts
    setUsername('');
    setPassword('');
    setErrors({});
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleRegister = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:5000/api/auth/admin-register', { username, password })
      .then(res => {
        alert(res.data.message);
        setUsername('');
        setPassword('');
        setErrors({});
        navigate('/admin-login');
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Registration failed');
      });
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setErrors({});
  };

  return (
    <div className="my-4 main-content">
      <h3>Admin Registration</h3>

      <input
        type="text"
        className={`form-control my-2 ${errors.username ? 'is-invalid' : ''}`}
        placeholder="Enter your username" // Added placeholder
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      {errors.username && <div className="text-danger">{errors.username}</div>}

      <input
        type="password"
        className={`form-control my-2 ${errors.password ? 'is-invalid' : ''}`}
        placeholder="Enter your password" // Added placeholder
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errors.password && <div className="text-danger">{errors.password}</div>}

      <div className="d-flex gap-2 mt-2">
        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
        <button className="btn btn-secondary" onClick={() => navigate('/admin-login')}>Login</button>
        <button className="btn btn-outline-danger" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default AdminRegister;
