const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin registration
router.post('/admin-register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO admins (username, password) VALUES (?, ?)';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ message: 'Admin already exists' });
      }
      return res.status(500).send(err);
    }
    res.send({ message: 'Admin registered successfully' });
  });
});

// User registration
router.post('/user-register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';

  db.query(query, [username, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({ message: 'User already exists' });
      }
      return res.status(500).send(err);
    }
    res.send({ message: 'User registered successfully' });
  });
});

// Admin login
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admins WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length > 0) {
      res.send({ message: 'Admin login successful' });
    } else {
      res.status(401).send({ message: 'Invalid admin credentials' });
    }
  });
});

// ✅ Updated User login
router.post('/user-login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).send({ message: 'Server error' });
    if (results.length > 0) {
      res.send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid credentials' });
    }
  });
});

module.exports = router;
