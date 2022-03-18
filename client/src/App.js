import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { Button, Container, Navbar, Nav, NavDropdown, Div } from "react-bootstrap";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Cookies from "js-cookie";
import Card from "./pages/Card";
import Shopping from "./pages/Shopping";
import Authentication from "./pages/Authentication";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (Cookies.get("access-token")) {
      setAuthState(true);
    }
  }, []);

  const logout = () => {
    Cookies.remove("access-token");
    setAuthState(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {/* ============================ Navbar Section ==============================  */}
          <Navbar bg="light" expand="lg">
            <Container fluid>
              <Link to="/" className="Navbar__brand">
                <Navbar.Brand>Mineimages</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Link to="/card" className="Nav-link">
                    <Nav.Link href="/">New</Nav.Link>
                  </Link>
                  <Link to="/shopping" className="Nav-link">
                      <Nav.Link href="#action3">
                        Cart
                      </Nav.Link>
                    </Link>
{/* 
                  <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <Link to="/shopping">
                      <NavDropdown.Item href="#action3">
                        Cart
                      </NavDropdown.Item>
                    </Link>

                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}

                  <Nav.Link href="#" disabled></Nav.Link>


                </Nav>
              <Nav >
                {!authState && (
                  <>
                    <Link to="/auth/signin" className="Nav-link">
                    <Nav.Link href="/">SignIn</Nav.Link>
                      {/* <Button variant="outline-success btn">SignIn</Button> */}
                    </Link>

                    <Link to="/signup" className="Nav-link">
                      {/* <Button variant="outline-success btn">SignUp</Button> */}
                      <Nav.Link href="/">SignUp</Nav.Link>
                    </Link>
                  </>
                )}
                {authState && (
                  <Link to="/">
                    <Button variant="outline-success btn" onClick={logout}>
                      Logout
                    </Button>
                  </Link>
                )}
               </Nav>

              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* ============================ Navbar Section ==============================  */}

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth/signin" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/checkout/card" exact element={<Card />} />
            <Route path="/shopping" exact element={<Shopping />} />
            <Route path="/authentication/activate/:token" exact element={<Authentication />} />
            
            
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
