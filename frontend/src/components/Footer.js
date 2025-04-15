// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer  className="footer-custom">
      &copy; {new Date().getFullYear()} Inventory Management System
    </footer>
  );
}

export default Footer;
