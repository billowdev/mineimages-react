import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Jombotron,
  NavDropdown,
  Form,
  FormControl
} from "react-bootstrap";

function NavbarComponent() {
  return (
    <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand href="#">Mineimages</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">New</Nav.Link>
          <NavDropdown title="Link" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3">Popular</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="#" disabled>
            Link
          </Nav.Link>
        </Nav>
        <Button variant="outline-success btn btn-login">Login</Button>
        <Button variant="outline-success btn">Register</Button>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default NavbarComponent;
