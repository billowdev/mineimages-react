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
      
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
