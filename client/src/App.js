import "./App.css";
import NavbarComponent from './components/header/NavbarComponent.js';
import Login from "./pages/Login";
import Home from "./pages/Home";
import {
  Button,
  Card,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Jombotron,
  NavDropdown
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <NavbarComponent></NavbarComponent>
     
       
        {/* <Navbar className="justify-content-between" bg="light" expand="lg">
          <Navbar.Brand href="/">Mineimages</Navbar.Brand>
          <div style={{ display: "flex" }}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="https://www.youtube.com" target="_blank">
                  Website
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar> */}

        {/* <Container style={{ padding: 20, marginTop: 20 }}>
          <br />
          <h3 style={{ textAlign: "center" }}> This webpage is developed using bootstrap</h3>
          <br />
          <Row>
            <Col md={4}>
              <Card style={{ padding: 20}}>
                <Card.Body>
                  <Card.Img Valiant="top" src={require("./assets/images/images.jpg")}></Card.Img>
                 <br />
                 <Card.Title>Some title</Card.Title>
                 <Card.Text>Our daily news to learn while reading</Card.Text>
                 <Card.Link href="https://www.google.com" target="_blank"></Card.Link>
                 <Button variant="warning">
                   Readmore
                   </Button>
                  </Card.Body>
                  </Card>
              </Col>
          </Row>
        </Container> */}

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
