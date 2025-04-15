// src/App.js
import React from 'react';
import './App.css'; // ✅ Importing global styles

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import NavigationBar from './components/Navbar';
import HomePage from './components/HomePage';
import UserLogin from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import UserRegister from './components/UserRegister';
import AdminRegister from './components/AdminRegister';
import ContactUs from './components/ContactUs'; // ✅ Add this import
import Footer from './components/Footer'; // ✅ Import Footer

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/contact" element={<ContactUs />} />   
        </Routes>
      </Container>
      <Footer /> {/* Footer component added here */}
    </Router>
  );
}

export default App;
