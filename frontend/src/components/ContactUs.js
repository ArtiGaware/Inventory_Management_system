// src/components/ContactUs.js
import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function ContactUs() {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Contact Us</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Your message" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default ContactUs;
