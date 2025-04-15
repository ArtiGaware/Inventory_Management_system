import React from 'react';
import { Container } from 'react-bootstrap';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-background position-relative">
      {/* Background image as an <img> */}
      <img
        src="/bg.jpg"
        alt="background"
        className="bg-img"
      />
      
      {/* Overlay and content */}
      <div className="overlay">
        <Container className="text-center homepage-content">
          <h2 className="text-white mb-4">Welcome to Inventory Management System</h2>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
