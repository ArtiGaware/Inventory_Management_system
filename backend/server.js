const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Connect to DB
const db = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminRoutes'); // ✅ Make sure this is here

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes); // ✅ Add this line

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
