// src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
<Navbar bg="info" variant="dark" expand="lg" sticky="top" className="shadow-sm rounded-bottom">



     <Container>
        {/* Logo and Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/logo11.png"
            alt="Inventory Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
        <span  className="btn-custom">Inventory System</span>     


        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={Link} to="/" className="btn-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/admin-login" className="btn-custom">Admin Login</Nav.Link>
            <Nav.Link as={Link} to="/user-login" className="btn-custom">User Login</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="btn-custom">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
