import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { Button, Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import Cookies from "js-cookie";

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
                  <Nav.Link href="/">New</Nav.Link>
                  <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Popular</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="#" disabled>
                    Link
                  </Nav.Link>
                </Nav>
                {!authState && (
                  <>
                    <Link to="/auth/signin">
                      <Button variant="outline-success btn">SignIn</Button>
                    </Link>

                    <Link to="/signup">
                      <Button variant="outline-success btn">SignUp</Button>
                    </Link>
                  </>
                )}
                {authState && (
                  <Button variant="outline-success btn" onClick={logout}>
                    Logout
                  </Button>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          {/* ============================ Navbar Section ==============================  */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/auth/signin" exact element={<SignIn />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
