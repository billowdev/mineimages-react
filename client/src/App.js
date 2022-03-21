import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthContext } from "./helpers/AuthContext";
import {
  Button,
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Div,
} from "react-bootstrap";

import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import UserProfile from "./pages/Profile/UserProfile";
import EditProfile from "./pages/Profile/EditProfile";
import Orders from "./pages/Orders";
import Footer from "./components/Footer/Footer";
import Cookies from "js-cookie";
import Card from "./pages/Card";
import Shopping from "./pages/Shopping";
import Authentication from "./pages/Authentication";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import UserOrders from "./pages/Profile/UserOrders";
import UserImages from "./pages/Profile/UserImages";

function App() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [authState, setAuthState] = useState(false);

  if (authState == false) {
    if (Cookies.get("access-token")) {
      setAuthState(true);
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <div className="App">
        <AuthContext.Provider
          value={{
            authState,
            setAuthState,
          }}
        >
          <Router>
            <div>
              <Toaster />
            </div>
            {/* ============================ Navbar Section ==============================  */}
            <Navbar bg="light" expand="lg" className="fixed-top">
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
                    {authState && (
                      <>
                        <Link to="/shopping" className="Nav-link">
                          <Nav.Link href="#action3">Cart</Nav.Link>
                        </Link>
                        <Link to="/orders" className="Nav-link">
                          <Nav.Link href="#action3">orders</Nav.Link>
                        </Link>
                      </>
                    )}

                    {authState && (
                      <>
                        <Link to="/card" className="Nav-link">
                          <Nav.Link href="/">New</Nav.Link>
                        </Link>
                      </>
                    )}

                    <Nav.Link href="#" disabled></Nav.Link>
                  </Nav>
                  <Nav>
                    {!authState && (
                      <>
                        <Link to="/auth/signin" className="Nav-link">
                          <Nav.Link href="/">SignIn</Nav.Link>
                        </Link>

                        <Link to="/signup" className="Nav-link">
                          {/* <Button variant="outline-success btn">SignUp</Button> */}
                          <Nav.Link href="/">SignUp</Nav.Link>
                        </Link>
                      </>
                    )}
                    {authState && (
                      <>
                        <Link to="/profile" replace>
                          <Button variant="outline-success btn">Profile</Button>
                        </Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            {/* ============================ Navbar Section ==============================  */}
          
            <Routes>
              <Route path="/" replace element={<Home />} />
              <Route path="/auth/signin" exact element={<SignIn />} />
              <Route path="/signup" exact element={<SignUp />} />
              <Route path="/checkout/card" replace element={<Card />} />
              <Route path="/shopping" replace element={<Shopping />} />
              <Route path="/profile" replace element={<Profile />} />
              <Route path="/profile/orders" replace element={<UserOrders />} />
              <Route path="/profile/images" replace element={<UserImages />} />
              <Route path="/profile/edit" exact element={<EditProfile />} />
              <Route path="/orders" replace element={<Orders />} />

              <Route
                path="/authentication/activate/:token"
                exact
                element={<Authentication />}
              />
            </Routes>
          </Router>
          <Footer />
        </AuthContext.Provider>
      </div>
    </>
  );
}

export default App;
